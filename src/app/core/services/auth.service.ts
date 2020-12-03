import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignInRequest, SignUpRequest } from 'src/app/core/models/signup';
import { AuthApiService } from 'src/app/core/services/auth-api.service';

@Injectable()
export class AuthService {
  constructor(private readonly api: AuthApiService, private readonly router: Router) {}

  isAuthenticated(): Observable<boolean> {
    return this.api.checkSession();
  }

  signUp(req: SignUpRequest) {
    return this.api.signUp(req.email, req.password);
  }

  signIn(req: SignInRequest) {
    return this.api.signIn(req.username, req.password);
  }

  logout() {
    return this.api.logout();
  }

  goToPageAfterLogin() {
    return this.router.navigateByUrl('/');
  }

  goToSignIn() {
    return this.router.navigateByUrl('auth/signin');
  }

  goToSignUp() {
    return this.router.navigateByUrl('auth/signup');
  }
}
