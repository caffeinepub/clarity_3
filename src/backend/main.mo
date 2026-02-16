import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Category types
  type CategoryResults = {
    reason : Nat;
    habit : Nat;
    emotion : Nat;
    convenience : Nat;
    social : Nat;
    health : Nat;
    productivity : Nat;
  };

  module CategoryResults {
    public func compareByTotalCount(results1 : CategoryResults, results2 : CategoryResults) : Order.Order {
      let total1 = results1.reason + results1.habit + results1.emotion + results1.convenience + results1.social + results1.health + results1.productivity;
      let total2 = results2.reason + results2.habit + results2.emotion + results2.convenience + results2.social + results2.health + results2.productivity;
      Nat.compare(total1, total2);
    };

    public func compareByReasonCount(results1 : CategoryResults, results2 : CategoryResults) : Order.Order {
      Nat.compare(results1.reason, results2.reason);
    };
  };

  // Stage response (simplified for core logic)
  type StageResponse = {
    response : Text;
    impulseStrength : Text;
    reason : Text;
    feeling : Text;
    category : Text;
    option : Text;
  };

  type CompletedSession = {
    actionTitle : Text;
    timing : Text;
    stageResponses : [StageResponse];
    finalDecision : Text;
    outcome : Text;
    timestamp : Time.Time;
  };

  module CompletedSession {
    public func compareByTimestamp(a : CompletedSession, b : CompletedSession) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  type SavedLoops = Map.Map<Text, CompletedSession>;
  let completedSessions = Map.empty<Principal, SavedLoops>();

  // Internal helper to get or create user sessions
  func getUserSessions(user : Principal) : SavedLoops {
    switch (completedSessions.get(user)) {
      case (?savedLoops) { savedLoops };
      case (null) { Map.empty<Text, CompletedSession>() };
    };
  };

  // Persist completed session (with new loop title)
  public shared ({ caller }) func saveSession(
    actionTitle : Text,
    stageResponses : [StageResponse],
    finalDecision : Text,
    outcome : Text,
    timing : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save sessions");
    };

    let userSavedLoops = getUserSessions(caller);
    let newSession : CompletedSession = {
      actionTitle;
      stageResponses;
      finalDecision;
      outcome;
      timestamp = Time.now();
      timing;
    };
    userSavedLoops.add(actionTitle, newSession);
    completedSessions.add(caller, userSavedLoops);
  };

  // Get percentage of reconsidered decisions
  public query ({ caller }) func getReconsiderationRate() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access stats");
    };

    let userSessions = getUserSessions(caller);
    if (userSessions.isEmpty()) { return 0 };

    let decisionStats = userSessions.values().toArray().foldLeft((0, 0), func((reconsidered, total), session) {
      let newReconsidered = if (session.finalDecision == "Reconsidered") { 1 } else { 0 };
      (reconsidered + newReconsidered, total + 1);
    });

    if (decisionStats.1 == 0) { return 0 };

    (decisionStats.0 * 100) / decisionStats.1;
  };

  // Compute most common impulse categories
  public query ({ caller }) func getCategoryAnalysis() : async CategoryResults {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access stats");
    };

    let userSessions = getUserSessions(caller);
    if (userSessions.isEmpty()) {
      return {
        reason = 0;
        habit = 0;
        emotion = 0;
        convenience = 0;
        social = 0;
        health = 0;
        productivity = 0;
      };
    };

    // Initialize stateful category counters
    var reasonCount = 0;
    var habitCount = 0;
    var emotionCount = 0;
    var convenienceCount = 0;
    var socialCount = 0;
    var healthCount = 0;
    var productivityCount = 0;

    // Count all categories
    userSessions.values().forEach(
      func(session) {
        session.stageResponses.forEach(
          func(response) {
            switch (response.category) {
              case ("reason") { reasonCount += 1 };
              case ("habit") { habitCount += 1 };
              case ("emotion") { emotionCount += 1 };
              case ("convenience") { convenienceCount += 1 };
              case ("social") { socialCount += 1 };
              case ("health") { healthCount += 1 };
              case ("productivity") { productivityCount += 1 };
              case (_) {};
            };
          }
        );
      }
    );

    {
      reason = reasonCount;
      habit = habitCount;
      emotion = emotionCount;
      convenience = convenienceCount;
      social = socialCount;
      health = healthCount;
      productivity = productivityCount;
    };
  };

  // Helper function for tuple comparison (by timestamp)
  func compareTupleByTimestamp(a : (Text, CompletedSession), b : (Text, CompletedSession)) : Order.Order {
    Int.compare(a.1.timestamp, b.1.timestamp);
  };

  // Get all user sessions
  public query ({ caller }) func getAllSessions() : async {
    allSessions : [(Text, CompletedSession)];
    sortedByTimestamp : [CompletedSession];
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access sessions");
    };

    let userSessions = getUserSessions(caller);
    let allSessions = userSessions.toArray();

    // Convert Map to Array and sort by timestamp descending
    let sortedSessions = allSessions.sort(compareTupleByTimestamp);

    {
      allSessions;
      sortedByTimestamp = sortedSessions.map<((Text, CompletedSession)), CompletedSession>(
        func((_, session)) { session }
      );
    };
  };

  // Get new sessions from past two days
  public query ({ caller }) func getRecentSessions() : async [CompletedSession] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access sessions");
    };

    let userSessions = getUserSessions(caller);

    let currentTime = Time.now();
    let twoDaysAgo = currentTime - (2_400_000_000_000 * 2);

    let newSessions = userSessions.filter(
      func(_title, session) { session.timestamp >= twoDaysAgo }
    );

    let sortedSessionEntries = newSessions.toArray().reverse();

    sortedSessionEntries.map<((Text, CompletedSession)), CompletedSession>(
      func((_, session)) { session }
    );
  };
};
