import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  canLoad(_route: Route, _segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          return this.router.parseUrl('auth/signin');
        }
        return true;
      }),
    );
  }
}
