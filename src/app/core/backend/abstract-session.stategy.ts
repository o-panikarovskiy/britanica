
export abstract class SessionStrategy {
  abstract async saveSession(userId: string): Promise<void>;
  abstract async retriveSessionId(): Promise<string | undefined>;
}
