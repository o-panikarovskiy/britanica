import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DeleteNoteComponent } from 'src/app/notes/components/del-note/del-note.component';
import { EditNoteComponent } from 'src/app/notes/components/edit-note/edit-note.component';
import { NoteItemAddComponent } from 'src/app/notes/components/note-item-add/note-item-add.component';
import { NotesRoutingModule } from 'src/app/notes/notes-routing.module';
import { TrimPipe } from 'src/app/notes/pipes/trim.pipe';
import { DialogManagerService } from 'src/app/notes/services/dialog-manager.service';
import { NotesStoreService } from 'src/app/notes/services/notes-store.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './components/list/list.component';
import { MainComponent } from './components/main/main.component';
import { NoteItemComponent } from './components/note-item/note-item.component';

@NgModule({
  declarations: [
    ListComponent, //
    MainComponent,
    NoteItemComponent,
    NoteItemAddComponent,
    EditNoteComponent,
    DeleteNoteComponent,
    TrimPipe,
  ],
  imports: [
    CommonModule, //
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NotesRoutingModule,
    SharedModule,
  ],
  providers: [
    NotesStoreService, //
    DialogManagerService,
  ],
})
export class NotesModule {}
