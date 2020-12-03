import { Component, Input } from '@angular/core';
import { Note } from 'src/app/core/models/note';

@Component({
  selector: 'app-notes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() notes: readonly Note[] = [];

  constructor() {}

  identify(_index: number, note: Note): string {
    return note.id;
  }
}
