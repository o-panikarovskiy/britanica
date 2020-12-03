import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/notes/components/main/main.component';
import { NotesListResolver } from 'src/app/notes/resolvers/notes-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    resolve: {
      notes: NotesListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
