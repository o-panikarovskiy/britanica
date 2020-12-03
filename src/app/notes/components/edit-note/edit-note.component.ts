import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppError } from 'src/app/core/models/app-error';
import { Note } from 'src/app/core/models/note';
import { NotesApiService } from 'src/app/core/services/abstract-notes-api.service';

@Component({
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent implements OnInit {
  public isSending = false;
  public serverError: AppError | undefined;
  public readonly form = new FormGroup({
    author: new FormControl(void 0, [Validators.required]),
    text: new FormControl(void 0, [Validators.required]),
  });

  constructor(
    private readonly api: NotesApiService, //
    @Inject(MAT_DIALOG_DATA) public data: Note,
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.data || {});
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isSending = true;
    this.serverError = void 0;

    const note: Note = this.data ? { ...this.data, ...this.form.value } : { ...this.form.value, created: new Date() };

    console.log(note);
  }
}
