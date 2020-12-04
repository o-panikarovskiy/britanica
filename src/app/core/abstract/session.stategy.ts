export abstract class SessionStrategy {
  abstract async save(data?: any): Promise<void>;
  abstract async destroy(): Promise<void>;
  abstract async get(): Promise<string | undefined>;
  abstract async check(data?: any): Promise<boolean>;
}
