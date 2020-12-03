import { DBUser } from 'src/app/core/backend/db-user';

export abstract class UsersRepository {
  abstract async findUserById(id: string): Promise<DBUser | undefined>;
  abstract async findUserByEmail(email: string): Promise<DBUser | undefined>;
  abstract async createUser(email: string, password: string): Promise<DBUser>;
}
