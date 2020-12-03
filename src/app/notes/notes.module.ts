import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotesRoutingModule } from 'src/app/notes/notes-routing.module';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, NotesRoutingModule],
})
export class NotesModule {}
