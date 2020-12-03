import { UsersRepository } from 'src/app/core/backend/abstract-users.repository';
import { UsersIndexedDBRepository } from 'src/app/core/backend/users-idb.repository';
import { UsersLocalStorageRepository } from 'src/app/core/backend/users-storage.repository';

export function usersRepositoryFactory(): UsersRepository {
  if (window.indexedDB) {
    return new UsersIndexedDBRepository();
  }

  return new UsersLocalStorageRepository();
}
