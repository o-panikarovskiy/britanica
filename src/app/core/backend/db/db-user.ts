import { User } from 'src/app/core/models/user';
import { createGuid, sha256 } from 'src/app/core/utils/crypto-utils';

export type DBUser = {
  readonly id: string;
  readonly email: string;
  readonly passwordHash: string;
};

export function toClientUser(user: DBUser): User {
  return { id: user.id, email: user.email };
}

export async function comparePassword(user: DBUser, password: string): Promise<boolean> {
  const passwordHash = await sha256(user.id + password);
  return passwordHash === user.passwordHash;
}

export async function createDBUser(email: string, password: string): Promise<DBUser> {
  const id = createGuid();
  const passwordHash = await sha256(id + password);
  return { id, passwordHash, email };
}
