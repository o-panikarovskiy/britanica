import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/core/models/note';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public notes: readonly Note[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.notes = this.route.snapshot.data.notes;
  }
}
