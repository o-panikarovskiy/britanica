import { AuthApiService } from 'src/app/core/auth/models/auth-api';
import { AuthIndexedDbService } from 'src/app/core/auth/services/auth-indexed-db.service';

export function authApiFactory(): AuthApiService {
  if (window.indexedDB) {
    return new AuthIndexedDbService();
  }

  throw new Error(`Can't create AuthApiService`);
}
