import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Note } from 'src/app/core/models/note';
import { NotesApiService } from 'src/app/core/services/abstract-notes-api.service';

@Injectable({ providedIn: 'root' })
export class NotesListResolver implements Resolve<readonly Note[]> {
  constructor(private service: NotesApiService) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<readonly Note[]> {
    return this.service.list();
  }
}
