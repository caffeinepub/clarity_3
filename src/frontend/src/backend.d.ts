import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface CompletedSession {
    timing: string;
    stageResponses: Array<StageResponse>;
    timestamp: Time;
    outcome: string;
    actionTitle: string;
    finalDecision: string;
}
export interface StageResponse {
    option: string;
    feeling: string;
    response: string;
    category: string;
    impulseStrength: string;
    reason: string;
}
export interface CategoryResults {
    habit: bigint;
    social: bigint;
    emotion: bigint;
    productivity: bigint;
    convenience: bigint;
    reason: bigint;
    health: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllSessions(): Promise<{
        sortedByTimestamp: Array<CompletedSession>;
        allSessions: Array<[string, CompletedSession]>;
    }>;
    getCallerUserRole(): Promise<UserRole>;
    getCategoryAnalysis(): Promise<CategoryResults>;
    getRecentSessions(): Promise<Array<CompletedSession>>;
    getReconsiderationRate(): Promise<bigint>;
    isCallerAdmin(): Promise<boolean>;
    saveSession(actionTitle: string, stageResponses: Array<StageResponse>, finalDecision: string, outcome: string, timing: string): Promise<void>;
}
