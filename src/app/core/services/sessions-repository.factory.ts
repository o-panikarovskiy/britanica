import { SessionRepository } from 'src/app/core/abstract/session.repository';
import { SessionsIndexedDBRepository } from 'src/app/core/backend/auth/session-idb.repository';
import { SessionStoreageRepository } from 'src/app/core/backend/auth/session-storage.repository';

export function sessionsRepositoryFactory(): SessionRepository {
  if (window.indexedDB) {
    return new SessionsIndexedDBRepository();
  }

  return new SessionStoreageRepository();
}
