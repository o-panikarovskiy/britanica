import { UsersRepository } from 'src/app/core/backend/abstract-users.repository';

export abstract class SessionStrategy {
  constructor(private readonly usersRep: UsersRepository) {}

  abstract async save(userId: string): Promise<void>;
  abstract async destroy(): Promise<void>;
  abstract async get(): Promise<string | undefined>;

  async check(): Promise<boolean> {
    const sid = await this.get();
    if (!sid) return false;

    const user = await this.usersRep.findById(sid);
    return !!user;
  }
}
