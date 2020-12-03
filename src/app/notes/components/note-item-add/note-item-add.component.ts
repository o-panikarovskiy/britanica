import { Component, Input } from '@angular/core';
import { Note } from 'src/app/core/models/note';
import { DialogManagerService } from 'src/app/notes/services/dialog-manager.service';

@Component({
  selector: 'app-note-item-add',
  templateUrl: './note-item-add.component.html',
  styleUrls: ['./note-item-add.component.scss'],
})
export class NoteItemAddComponent {
  @Input() public note: Note;

  constructor(private readonly dm: DialogManagerService) {}

  createNote(): void {
    this.dm.showCreateNote();
  }
}
