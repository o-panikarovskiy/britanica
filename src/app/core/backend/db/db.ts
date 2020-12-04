import { environment } from 'src/environments/environment';

export async function openOrCreateDB(): Promise<IDBDatabase> {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const openReq = window.indexedDB.open(environment.indexedDBName, environment.indexedDBVersion);

    openReq.onupgradeneeded = (e: any) => {
      const db = e.target.result;

      const users = db.createObjectStore('users', { keyPath: 'id' });
      users.createIndex('email', 'email', { unique: true });

      db.createObjectStore('notes', { keyPath: 'id' });
    };

    openReq.onerror = reject;
    openReq.onsuccess = (e: any) => resolve(e.target.result);
  });
}
