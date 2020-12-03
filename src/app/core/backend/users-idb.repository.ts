import { Injectable } from '@angular/core';
import { UsersRepository } from 'src/app/core/backend/abstract-users.repository';
import { DBUser } from 'src/app/core/backend/db-user';
import { createGuid } from 'src/app/core/utils/crypto-utils';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersIndexedDbService extends UsersRepository {
  private readonly env = environment;

  async findUserById(id: string): Promise<DBUser | undefined> {
    const db = await this.openDb();
    return new Promise((resolve, reject) => {
      const req = db.transaction(['users']).objectStore('users').get(id);
      req.onerror = (err: any) => reject(err);
      req.onsuccess = (event: any) => resolve(event.target.result as DBUser);
    });
  }

  async findUserByEmail(email: string): Promise<DBUser | undefined> {
    const db = await this.openDb();
    return new Promise((resolve, reject) => {
      const req = db.transaction(['users']).objectStore('users').index('email').get(email);
      req.onerror = (err: any) => reject(err);
      req.onsuccess = (event: any) => resolve(event.target.result as DBUser);
    });
  }

  async createUser(email: string, password: string): Promise<DBUser> {
    const db = await this.openDb();
    return new Promise((resolve, reject) => {
      const dbUser = this.createNewUser(email, password);
      const transaction = db.transaction(['users'], 'readwrite');

      transaction.objectStore('users').add(dbUser);

      transaction.onerror = reject;
      transaction.oncomplete = () => resolve(dbUser);
    });
  }

  private createNewUser(email: string, password: string) {
    return { id: createGuid(), email, password };
  }

  private async openDb() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const openReq = window.indexedDB.open(this.env.indexedDBName, 2);

      openReq.onupgradeneeded = (e: any) => {
        const db = e.target.result;
        const users = db.createObjectStore('users', { keyPath: 'id' });
        users.createIndex('email', 'email', { unique: true });
      };

      openReq.onerror = reject;
      openReq.onsuccess = (e: any) => resolve(e.target.result);
    });
  }
}
