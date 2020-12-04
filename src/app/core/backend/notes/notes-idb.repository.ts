import { Injectable } from '@angular/core';
import { NotesRepository } from 'src/app/core/abstract/notes.repository';
import { openOrCreateDB } from 'src/app/core/backend/db/db';
import { AppError } from 'src/app/core/models/app-error';
import { Note } from 'src/app/core/models/note';
import { PickRequired } from 'src/app/core/models/types';
import { createGuid } from 'src/app/core/utils/crypto-utils';
import { environment } from 'src/environments/environment';

@Injectable()
export class NotesIndexedDBRepository extends NotesRepository {
  private readonly env = environment;

  list = async (): Promise<Note[]> => {
    const db = await openOrCreateDB();

    return new Promise((resolve, reject) => {
      const res: Note[] = [];
      const req = db.transaction(['notes']).objectStore('notes').openCursor();

      req.onerror = (e: any) => reject(new AppError(e?.target?.error, 'DBError'));
      req.onsuccess = (e: any) => {
        const cursor = e?.target?.result;
        if (cursor) {
          res.push(cursor.value);
          cursor.continue();
        } else {
          resolve(res);
        }
      };
    });
  };

  create = async (note: Omit<Note, 'id'>): Promise<Note> => {
    const db = await openOrCreateDB();
    const newNote: Note = { ...note, id: createGuid() };

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['notes'], 'readwrite');
      transaction.objectStore('notes').add(newNote);

      transaction.oncomplete = () => resolve(newNote);
      transaction.onerror = (e: any) => reject(new AppError(e?.target?.error, 'DBError'));
    });
  };

  update = async (note: PickRequired<Note, 'id'>): Promise<Note | undefined> => {
    const db = await openOrCreateDB();
    const oldNote = await this.findById(db, note.id);
    if (!oldNote) return;

    const newNote = { ...oldNote, ...note } as Note;

    return new Promise<Note>((resolve, reject) => {
      const transaction = db.transaction(['notes'], 'readwrite');
      transaction.objectStore('notes').put(newNote);

      transaction.oncomplete = () => resolve(newNote);
      transaction.onerror = (e: any) => reject(new AppError(e?.target?.error, 'DBError'));
    });
  };

  delete = async (id: string): Promise<Note | undefined> => {
    const db = await openOrCreateDB();
    const oldNote = await this.findById(db, id);
    if (!oldNote) return;

    return new Promise<Note>((resolve, reject) => {
      const transaction = db.transaction(['notes'], 'readwrite');
      transaction.objectStore('notes').delete(id);

      transaction.oncomplete = () => resolve(oldNote);
      transaction.onerror = (e: any) => reject(new AppError(e?.target?.error, 'DBError'));
    });
  };

  private findById = async (db: IDBDatabase, id: string): Promise<Note | undefined> => {
    return new Promise<Note | undefined>((resolve, reject) => {
      const req = db.transaction(['notes']).objectStore('notes').get(id);

      req.onsuccess = (event: any) => resolve(event.target.result);
      req.onerror = (e: any) => reject(new AppError(e?.target?.error, 'DBError'));
    });
  };
}
