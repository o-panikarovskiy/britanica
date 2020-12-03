import { Observable } from 'rxjs';
import { SignInResponse, SignUpResponse } from 'src/app/core/models/signup';

export abstract class AuthApiService {
  abstract checkSession(): Observable<boolean>;
  abstract signIn(username: string, password: string): Observable<SignInResponse>;
  abstract signUp(email: string, password: string): Observable<SignUpResponse>;
}
