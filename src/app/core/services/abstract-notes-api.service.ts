import { Observable } from 'rxjs';
import { Note } from 'src/app/core/models/note';
import { PickRequired } from 'src/app/core/models/types';

export abstract class NotesApiService {
  abstract list(): Observable<readonly Note[]>;
  abstract create(note: Omit<Note, 'id'>): Observable<Note>;
  abstract update(note: PickRequired<Note, 'id'>): Observable<Note>;
  abstract delete(id: string): Observable<Note>;
}
