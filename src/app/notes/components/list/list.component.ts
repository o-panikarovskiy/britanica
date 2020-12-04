import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from 'src/app/core/models/note';
import { NotesStoreService } from 'src/app/notes/services/notes-store.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public readonly notes$: Observable<readonly Note[]>;

  constructor(private readonly store: NotesStoreService) {
    this.notes$ = this.store.sortedList$;
  }

  identify(_index: number, note: Note): string {
    return note.id;
  }
}
