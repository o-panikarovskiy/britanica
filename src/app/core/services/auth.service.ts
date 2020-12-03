import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInRequest, SignUpRequest } from 'src/app/core/models/signup';
import { AuthApiService } from 'src/app/core/services/auth-api.service';

@Injectable()
export class AuthService {
  constructor(private readonly api: AuthApiService) {}

  isAuthenticated(): Observable<boolean> {
    return this.api.checkSession();
  }

  signUp(req: SignUpRequest) {
    return this.api.signUp(req.email, req.password);
  }

  signIn(req: SignInRequest) {
    return this.api.signIn(req.username, req.password);
  }
}
