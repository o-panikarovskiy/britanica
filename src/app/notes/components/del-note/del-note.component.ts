import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppError } from 'src/app/core/models/app-error';
import { Note } from 'src/app/core/models/note';
import { NotesStoreService } from 'src/app/notes/services/notes-store.service';

@Component({
  templateUrl: './del-note.component.html',
  styleUrls: ['./del-note.component.scss'],
})
export class DeleteNoteComponent {
  public isSending = false;
  public serverError: AppError | undefined;

  constructor(
    private readonly store: NotesStoreService, //
    @Inject(MAT_DIALOG_DATA) public note: Note,
    private dialogRef: MatDialogRef<DeleteNoteComponent>,
  ) {}

  remove() {
    this.isSending = true;
    this.serverError = void 0;

    this.store
      .delete(this.note.id)
      .subscribe(
        (note) => this.dialogRef.close(note),
        (err: AppError) => (this.serverError = err),
      )
      .add(() => (this.isSending = false));
  }
}
