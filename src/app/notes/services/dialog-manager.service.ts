import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Note } from 'src/app/core/models/note';
import { EditNoteComponent } from 'src/app/notes/components/edit-note/edit-note.component';

@Injectable()
export class DialogManagerService {
  constructor(private dialog: MatDialog) {}

  public showCreateNote(): Observable<any> {
    return this.dialog.open(EditNoteComponent).afterClosed();
  }

  public showEditNote(note: Note): Observable<any> {
    return this.dialog.open(EditNoteComponent, { data: note }).afterClosed();
  }
}
