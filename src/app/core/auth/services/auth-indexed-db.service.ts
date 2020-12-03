import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthApiService } from 'src/app/core/auth/models/auth-api';
import { SignUpResponse } from 'src/app/core/auth/models/signup-response';
import { User } from 'src/app/core/auth/models/user';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthIndexedDbService extends AuthApiService {
  private readonly env = environment;

  checkSession() {
    return of(false);
  }

  signUp(email: string, password: string): Observable<SignUpResponse> {
    return of({ sid: '1', user: { id: '1', email } });
  }

  private checkUserExists(email: string): Observable<boolean> {
    return this.findUserByEmail(email).pipe(map((user) => !!user));
  }

  private findUserByEmail(email: string): Observable<User | undefined> {
    return this.openDb().pipe(
      switchMap((db) => {
        return new Observable<User>((subscriber) => {
          const req = db.transaction('users').objectStore('users').index('email').get(email);
          req.onerror = (err: any) => subscriber.error(err);
          req.onsuccess = (event: any) => {
            subscriber.next(event.target.result as User);
            subscriber.complete();
          };
        });
      }),
    );
  }

  private openDb() {
    return new Observable<IDBDatabase>((subscriber) => {
      const openReq = window.indexedDB.open(this.env.indexedDBName);
      openReq.onerror = (err: any) => subscriber.error(err);
      openReq.onsuccess = (e: any) => {
        const db = e.target.result;

        const users = db.createObjectStore('users', { keyPath: 'id' });
        users.createIndex('email', 'email', { unique: true });

        const sessions = db.createObjectStore('sessions', { keyPath: 'id' });

        subscriber.next(db);
        subscriber.complete();
      };
    });
  }
}
