import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { AppError } from 'src/app/core/models/app-error';
import { Note } from 'src/app/core/models/note';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { NotesStoreService } from 'src/app/notes/services/notes-store.service';

@Component({
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent extends Destroyer implements OnInit {
  public isSending = false;
  public serverError: AppError | undefined;
  public readonly form = new FormGroup({
    author: new FormControl(void 0, [Validators.required]),
    text: new FormControl(void 0, [Validators.required]),
  });

  constructor(
    private readonly store: NotesStoreService, //
    private dialogRef: MatDialogRef<EditNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Note,
  ) {
    super();
  }

  ngOnInit() {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.isSending = true;
    this.serverError = void 0;

    const note: Note = this.data
      ? { ...this.data, ...this.form.value } //
      : { ...this.form.value, created: new Date() };

    this.store
      .save(note)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (note) => this.dialogRef.close(note),
        (err: AppError) => (this.serverError = err),
      )
      .add(() => (this.isSending = false));
  }
}
