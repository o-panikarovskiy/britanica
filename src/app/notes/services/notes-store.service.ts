import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NotesApiService } from 'src/app/core/abstract/notes-api.service';
import { Note } from 'src/app/core/models/note';

@Injectable()
export class NotesStoreService {
  public readonly sortedList$: Observable<readonly Note[]>;
  private readonly changes$ = new BehaviorSubject<void>(void 0);

  constructor(private readonly api: NotesApiService) {
    this.sortedList$ = this.changes$.pipe(
      switchMap(() => this.api.list()),
      map((list) => list.sort((a, b) => a.created.getTime() - b.created.getTime())),
    );
  }

  save(note: Note): Observable<Note | undefined> {
    return this.createOrUpdate(note).pipe(
      map((note) => {
        this.changes$.next();
        return note;
      }),
    );
  }

  delete(id: string): Observable<Note | undefined> {
    return this.api.delete(id).pipe(
      map((note) => {
        this.changes$.next();
        return note;
      }),
    );
  }

  private createOrUpdate(note: Note) {
    return note.id ? this.api.update(note) : this.api.create(note);
  }
}
