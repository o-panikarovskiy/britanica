import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApiService } from 'src/app/core/auth/models/auth-api';

@Injectable()
export class AuthService {
  constructor(private readonly api: AuthApiService) {}

  isAuthenticated(): Observable<boolean> {
    return this.api.checkSession();
  }
}
