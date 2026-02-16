# Specification

## Summary
**Goal:** Build the “Clarity” app’s core Self‑Confrontation Loop with Internet Identity auth, per-user session persistence, history, analytics, and a minimal consequence visualization experience.

**Planned changes:**
- Add Internet Identity sign-in/sign-out and restrict all history/analytics/session saving to authenticated users only.
- Implement the 4-stage Self‑Confrontation Loop UI with the specified branching logic, including “Reconsider” returning to Stage 1 and discarding the in-progress session.
- Create a Motoko backend data model and methods to save and list completed sessions scoped to the caller Principal (stable, upgrade-safe).
- Add “Past Decisions” screen to list sessions (newest first) and view details including recorded stage responses and final decision.
- Add an analytics dashboard computed from the user’s sessions: % reconsidered, most common impulse category, and time-of-day patterns; prompt for optional impulse category during/after completion.
- Build Stage 4 Consequence Visualization split view (“Immediate pleasure” vs “Long-term effect”) with slow subtle CSS-based animations and a default-off heartbeat ambient sound toggle.
- Apply the specified minimal matte-black/glass-morphism UI design across all screens, including fade-in questions and a short delay before buttons enable.
- Organize routes/pages and reusable components for stages, prompts, session summary, and analytics widgets within the existing React + TypeScript template.

**User-visible outcome:** Authenticated users can complete the Self‑Confrontation Loop, save completed sessions, review past decisions with full recorded responses, and view a simple personal analytics dashboard; Stage 4 provides a calm split-screen consequence visualization with an optional heartbeat sound toggle.
