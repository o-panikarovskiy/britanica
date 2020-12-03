import { Component, OnInit } from '@angular/core';
import { NotesApiService } from 'src/app/core/services/abstract-notes-api.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private readonly notes: NotesApiService) {}

  ngOnInit(): void {
    this.notes.list().subscribe((list) => {
      console.log(list);
    });
  }
}
