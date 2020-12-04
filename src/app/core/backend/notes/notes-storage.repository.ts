import { Injectable } from '@angular/core';
import { NotesRepository } from 'src/app/core/abstract/notes.repository';
import { Note } from 'src/app/core/models/note';
import { IStringTMap, PickRequired } from 'src/app/core/models/types';
import { createGuid } from 'src/app/core/utils/crypto-utils';
import { environment } from 'src/environments/environment';

@Injectable()
export class NotesStoreageRepository extends NotesRepository {
  private readonly env = environment;

  async list(): Promise<Note[]> {
    const map = this.getMap();
    return Object.values(map);
  }

  async create(note: Omit<Note, 'id'>): Promise<Note> {
    const newNote: Note = { ...note, id: createGuid() };
    this.addToMap(newNote);
    return newNote;
  }

  async update(note: PickRequired<Note, 'id'>): Promise<Note | undefined> {
    const map = this.getMap();
    const oldNote = map[note.id];

    if (!oldNote) return;

    const newNote = { ...oldNote, ...note };
    map[note.id] = newNote;
    this.saveMap(map);

    return newNote;
  }

  async delete(id: string): Promise<Note | undefined> {
    const map = this.getMap();

    const oldNote = map[id];
    delete map[id];

    this.saveMap(map);
    return oldNote;
  }

  private getMap(): IStringTMap<Note> {
    try {
      const str = window.localStorage.getItem(this.getKeyName());
      if (!str) return {};
      return JSON.parse(str);
    } catch (error) {
      return {};
    }
  }

  private addToMap(note: Note) {
    this.saveMap({ ...this.getMap(), [note.id]: note });
  }

  private saveMap(map: IStringTMap<Note>) {
    const str = JSON.stringify(map);
    window.localStorage.setItem(this.getKeyName(), str);
  }

  private getKeyName() {
    return `${this.env.indexedDBName}Notes`;
  }
}
