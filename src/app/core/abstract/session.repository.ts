export abstract class SessionRepository {
  abstract async get(id: string): Promise<Date | undefined>;
  abstract async delete(id: string): Promise<void>;
  abstract async set(id: string, expDate: Date): Promise<void>;
}
