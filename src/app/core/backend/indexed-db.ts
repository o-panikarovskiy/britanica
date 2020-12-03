import { environment } from 'src/environments/environment';

export async function openOrCreateDB(): Promise<IDBDatabase> {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const openReq = window.indexedDB.open(environment.indexedDBName, environment.indexedDBVersion);

    openReq.onupgradeneeded = (e: any) => {
      const db = e.target.result;

      const users = db.createObjectStore('users', { keyPath: 'ID' });
      users.createIndex('email', 'Email', { unique: true });

      const notes = db.createObjectStore('notes', { keyPath: 'id' });
      notes.createIndex('creatorId', 'creatorId', { unique: false });
    };

    openReq.onerror = reject;
    openReq.onsuccess = (e: any) => resolve(e.target.result);
  });
}
