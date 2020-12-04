import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { NotesApiService } from 'src/app/core/abstract/notes-api.service';
import { NotesRepository } from 'src/app/core/abstract/notes.repository';
import { SessionStrategy } from 'src/app/core/abstract/session.stategy';
import { AppError } from 'src/app/core/models/app-error';
import { Note } from 'src/app/core/models/note';
import { PickRequired } from 'src/app/core/models/types';

@Injectable()
export class NotesMockApiService extends NotesApiService {
  constructor(
    private readonly notesRep: NotesRepository, //
    private readonly sessionStrategy: SessionStrategy,
  ) {
    super();
  }

  list(): Observable<Note[]> {
    return from(this.assertSession().then(this.notesRep.list));
  }

  create = (note: Omit<Note, 'id'>): Observable<Note> => {
    return from(this.assertSession().then(() => this.notesRep.create(note)));
  };

  update = (note: PickRequired<Note, 'id'>): Observable<Note | undefined> => {
    return from(this.assertSession().then(() => this.notesRep.update(note)));
  };

  delete = (id: string): Observable<Note | undefined> => {
    return from(this.assertSession().then(() => this.notesRep.delete(id)));
  };

  private assertSession = async () => {
    const isSessionOk = await this.sessionStrategy.check();
    if (!isSessionOk) {
      throw new AppError('Invalid session.', 'InvalidSession');
    }
  };
}
