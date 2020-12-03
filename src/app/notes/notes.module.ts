import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotesRoutingModule } from 'src/app/notes/notes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './components/list/list.component';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    ListComponent, //
    MainComponent,
  ],
  imports: [
    CommonModule, //
    NotesRoutingModule,

    SharedModule,
  ],
})
export class NotesModule {}
