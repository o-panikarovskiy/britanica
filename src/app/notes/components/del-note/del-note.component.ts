import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { AppError } from 'src/app/core/models/app-error';
import { Note } from 'src/app/core/models/note';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { NotesStoreService } from 'src/app/notes/services/notes-store.service';

@Component({
  templateUrl: './del-note.component.html',
  styleUrls: ['./del-note.component.scss'],
})
export class DeleteNoteComponent extends Destroyer {
  public isSending = false;
  public serverError: AppError | undefined;

  constructor(
    private readonly store: NotesStoreService, //
    @Inject(MAT_DIALOG_DATA) public note: Note,
    private dialogRef: MatDialogRef<DeleteNoteComponent>,
  ) {
    super();
  }

  remove() {
    this.isSending = true;
    this.serverError = void 0;

    this.store
      .delete(this.note.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (note) => this.dialogRef.close(note),
        (err: AppError) => (this.serverError = err),
      )
      .add(() => (this.isSending = false));
  }
}
