import { Note } from 'src/app/core/models/note';
import { PickRequired } from 'src/app/core/models/types';

export abstract class NotesRepository {
  abstract async list(): Promise<Note[]>;
  abstract async create(note: Omit<Note, 'id'>): Promise<Note>;
  abstract async update(note: PickRequired<Note, 'id'>): Promise<Note | undefined>;
  abstract async delete(id: string): Promise<Note | undefined>;
}
