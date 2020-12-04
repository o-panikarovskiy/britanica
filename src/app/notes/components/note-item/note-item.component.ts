import { Component, Input } from '@angular/core';
import { Note } from 'src/app/core/models/note';
import { DialogManagerService } from 'src/app/notes/services/dialog-manager.service';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent {
  @Input() public note: Note;

  constructor(private readonly dm: DialogManagerService) {}

  edit(): void {
    this.dm.showEditNote(this.note);
  }

  remove(): void {
    this.dm.showDeleteNote(this.note);
  }
}
