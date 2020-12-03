import { UsersRepository } from 'src/app/core/backend/abstract-users.repository';
import { UsersIndexedDbService } from 'src/app/core/backend/users-idb.repository';

export function usersServiceFactory(): UsersRepository {
  if (window.indexedDB) {
    return new UsersIndexedDbService();
  }

  throw new Error(`Can't create AuthApiService`);
}
