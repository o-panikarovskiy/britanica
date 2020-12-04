import { Injectable } from '@angular/core';
import { NotesRepository } from 'src/app/core/abstract/notes.repository';
import { openOrCreateDB } from 'src/app/core/backend/db/db';
import { Note } from 'src/app/core/models/note';
import { PickRequired } from 'src/app/core/models/types';
import { createGuid } from 'src/app/core/utils/crypto-utils';
import { environment } from 'src/environments/environment';

type NoteWithDB = { db: IDBDatabase; note: Note | undefined };

@Injectable()
export class NotesIndexedDBRepository extends NotesRepository {
  private readonly env = environment;

  async list(): Promise<Note[]> {
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

  async update(note: PickRequired<Note, 'id'>): Promise<Note | undefined> {
    const { db, note: oldNote } = await this.findById(note.id);
    if (!oldNote) return;

    const newNote = { ...oldNote, ...note };
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['notes'], 'readwrite');
      transaction.objectStore('notes').put(newNote);
      transaction.onerror = reject;
      transaction.oncomplete = () => resolve(newNote);
    });
  }

  async delete(id: string): Promise<Note | undefined> {
    const { db, note: oldNote } = await this.findById(id);
    if (!oldNote) return;

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['notes'], 'readwrite');
      transaction.objectStore('notes').delete(oldNote.id);
      transaction.onerror = reject;
      transaction.oncomplete = () => resolve(oldNote);
    });
  }

  private async findById(id: string): Promise<NoteWithDB> {
    const db = await openOrCreateDB();

    return new Promise<NoteWithDB>((resolve, reject) => {
      const req = db.transaction(['notes']).objectStore('notes').get(id);
      req.onerror = (err: any) => reject(err);
      req.onsuccess = (event: any) => resolve({ db, note: event.target.result as Note });
    });
  }
}