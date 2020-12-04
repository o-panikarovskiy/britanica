import { DBUser } from 'src/app/core/backend/db/db-user';

export abstract class UsersRepository {
  abstract async findById(id: string): Promise<DBUser | undefined>;
  abstract async findByEmail(email: string): Promise<DBUser | undefined>;
  abstract async add(email: string, password: string): Promise<DBUser>;
}
