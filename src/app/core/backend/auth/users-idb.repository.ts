import { Injectable } from '@angular/core';
import { UsersRepository } from 'src/app/core/abstract/users.repository';
import { openOrCreateDB } from 'src/app/core/backend/db/db';
import { createDBUser, DBUser } from 'src/app/core/backend/db/db-user';
import { AppError } from 'src/app/core/models/app-error';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersIndexedDBRepository extends UsersRepository {
  private readonly env = environment;

  findById = async (id: string): Promise<DBUser | undefined> => {
    const db = await openOrCreateDB();

    return new Promise<DBUser>((resolve, reject) => {
      const req = db.transaction(['users']).objectStore('users').get(id);
      req.onerror = (e: any) => reject(new AppError(e?.target?.error, 'DBError'));
      req.onsuccess = (e: any) => resolve(e?.target?.result);
    });
  };

  findByEmail = async (email: string): Promise<DBUser | undefined> => {
    const db = await openOrCreateDB();

    return new Promise<DBUser>((resolve, reject) => {
      const req = db.transaction(['users']).objectStore('users').index('email').get(email);
      req.onerror = (e: any) => reject(new AppError(e?.target?.error, 'DBError'));
      req.onsuccess = (e: any) => resolve(e?.target?.result);
    });
  };

  add = async (email: string, password: string): Promise<DBUser> => {
    const [db, user] = await Promise.all([
      openOrCreateDB(), //
      createDBUser(email, password),
    ]);

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readwrite');
      transaction.objectStore('users').add(user);
      transaction.onerror = (e: any) => reject(new AppError(e?.target?.error, 'DBError'));
      transaction.oncomplete = () => resolve(user);
    });
  };
}
