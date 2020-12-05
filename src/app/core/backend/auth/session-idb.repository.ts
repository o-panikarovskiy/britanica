import { Injectable } from '@angular/core';
import { SessionRepository } from 'src/app/core/abstract/session.repository';
import { openOrCreateDB } from 'src/app/core/backend/db/db';
import { AppError } from 'src/app/core/models/app-error';
import { environment } from 'src/environments/environment';

@Injectable()
export class SessionsIndexedDBRepository extends SessionRepository {
  private readonly env = environment;

  get = async (id: string): Promise<Date | undefined> => {
    const db = await openOrCreateDB();

    return new Promise<Date>((resolve, reject) => {
      const req = db.transaction(['sessions']).objectStore('sessions').get(id);
      req.onerror = (e: any) => reject(new AppError(e?.target?.error, 'DBError'));
      req.onsuccess = (e: any) => resolve(e?.target?.result ? new Date(e.target.result.expDate) : void 0);
    });
  };

  delete = async (id: string): Promise<void> => {
    const db = await openOrCreateDB();

    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(['sessions'], 'readwrite');
      transaction.objectStore('sessions').delete(id);

      transaction.oncomplete = () => resolve();
      transaction.onerror = (e: any) => reject(new AppError(e?.target?.error, 'DBError'));
    });
  };

  set = async (id: string, expDate: Date): Promise<void> => {
    const db = await openOrCreateDB();

    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(['sessions'], 'readwrite');
      transaction.objectStore('sessions').add({ id, expDate });
      transaction.onerror = (e: any) => reject(new AppError(e?.target?.error, 'DBError'));
      transaction.oncomplete = () => resolve();
    });
  };
}
