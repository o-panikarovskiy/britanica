import { Injectable } from '@angular/core';
import { NotesRepository } from 'src/app/core/backend/abstract-notes.repository';
import { openOrCreateDB } from 'src/app/core/backend/indexed-db';
import { AppError } from 'src/app/core/models/app-error';
import { Note } from 'src/app/core/models/note';
import { PickRequired } from 'src/app/core/models/types';
import { createGuid } from 'src/app/core/utils/crypto-utils';
import { environment } from 'src/environments/environment';

@Injectable()
export class NotesIndexedDBRepository extends NotesRepository {
  private readonly env = environment;

  async list(): Promise<readonly Note[]> {
    const db = await openOrCreateDB();

    return new Promise((resolve, reject) => {
      const req = db.transaction(['notes']).objectStore('notes').openCursor();
      const res: Note[] = [];
      req.onerror = (err: any) => reject(err);
      req.onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          res.push(cursor.value);
          cursor.continue();
        } else {
          resolve(res);
        }
      };
    });
  }

  async create(note: Omit<Note, 'id'>): Promise<Note> {
    const db = await openOrCreateDB();
    const newNote: Note = { ...note, id: createGuid() };

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['notes'], 'readwrite');
      transaction.objectStore('notes').add(newNote);
      transaction.onerror = reject;
      transaction.oncomplete = () => resolve(newNote);
    });
  }

  async update(note: PickRequired<Note, 'id'>): Promise<Note> {
    throw new AppError('Not implemented', 'NotImplemented');
  }

  async delete(id: string): Promise<Note> {
    throw new AppError('Not implemented', 'NotImplemented');
  }
}
