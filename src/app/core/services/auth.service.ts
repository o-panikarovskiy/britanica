import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthApiService } from 'src/app/core/abstract/auth-api.service';
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from 'src/app/core/models/signup';

@Injectable()
export class AuthService {
  constructor(private readonly api: AuthApiService, private readonly router: Router) {}

  isAuthenticated(): Observable<boolean> {
    return this.api.checkSession();
  }

  signUp(req: SignUpRequest): Observable<SignUpResponse> {
    return this.api.signUp(req.email, req.password);
  }

  signIn(req: SignInRequest): Observable<SignInResponse> {
    return this.api.signIn(req.username, req.password);
  }

  logout(): Observable<void> {
    return this.api.logout();
  }

  goToPageAfterLogin(): Promise<boolean> {
    return this.router.navigateByUrl('/');
  }

  goToSignIn(): Promise<boolean> {
    return this.router.navigateByUrl('auth/signin');
  }

  goToSignUp(): Promise<boolean> {
    return this.router.navigateByUrl('auth/signup');
  }
}
