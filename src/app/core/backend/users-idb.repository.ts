import { Injectable } from '@angular/core';
import { UsersRepository } from 'src/app/core/backend/abstract-users.repository';
import { createDBUser, DBUser } from 'src/app/core/backend/db-user';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersIndexedDBRepository extends UsersRepository {
  private readonly env = environment;

  async findById(id: string): Promise<DBUser | undefined> {
    const db = await this.openDb();

    return new Promise((resolve, reject) => {
      const req = db.transaction(['users']).objectStore('users').get(id);
      req.onerror = (err: any) => reject(err);
      req.onsuccess = (event: any) => resolve(event.target.result as DBUser);
    });
  }

  async findByEmail(email: string): Promise<DBUser | undefined> {
    const db = await this.openDb();

    return new Promise((resolve, reject) => {
      const req = db.transaction(['users']).objectStore('users').index('email').get(email);
      req.onerror = (err: any) => reject(err);
      req.onsuccess = (event: any) => resolve(event.target.result as DBUser);
    });
  }

  async add(email: string, password: string): Promise<DBUser> {
    const [db, user] = await Promise.all([
      this.openDb(), //
      createDBUser(email, password),
    ]);

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readwrite');
      transaction.objectStore('users').add(user);
      transaction.onerror = reject;
      transaction.oncomplete = () => resolve(user);
    });
  }

  private async openDb() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const openReq = window.indexedDB.open(this.env.indexedDBName, 2);

      openReq.onupgradeneeded = (e: any) => {
        const db = e.target.result;
        const users = db.createObjectStore('users', { keyPath: 'ID' });
        users.createIndex('email', 'Email', { unique: true });
      };

      openReq.onerror = reject;
      openReq.onsuccess = (e: any) => resolve(e.target.result);
    });
  }
}
