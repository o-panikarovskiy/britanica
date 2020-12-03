export abstract class SessionStrategy {
  abstract async save(userId: string): Promise<void>;
  abstract async destroy(): Promise<void>;
  abstract async get(): Promise<string | undefined>;
}
