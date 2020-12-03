import { User } from 'src/app/core/models/user';
import { createGuid, sha256 } from 'src/app/core/utils/crypto-utils';

export type DBUser = {
  readonly ID: string;
  readonly Email: string;
  readonly PasswordHash: string;
};

export function toClientUser(user: DBUser): User {
  return { id: user.ID, email: user.Email };
}

export async function comparePassword(user: DBUser, password: string): Promise<boolean> {
  const passwordHash = await sha256(user.ID + password);
  return passwordHash === user.PasswordHash;
}

export async function createDBUser(email: string, password: string): Promise<DBUser> {
  const ID = createGuid();
  const PasswordHash = await sha256(ID + password);
  return { ID, PasswordHash, Email: email };
}
