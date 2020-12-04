import { UsersRepository } from 'src/app/core/abstract/users.repository';
import { UsersIndexedDBRepository } from 'src/app/core/backend/auth/users-idb.repository';
import { UsersLocalStorageRepository } from 'src/app/core/backend/auth/users-storage.repository';

export function usersRepositoryFactory(): UsersRepository {
  if (window.indexedDB) {
    return new UsersIndexedDBRepository();
  }

  return new UsersLocalStorageRepository();
}
