import { Observable } from 'rxjs';
import { SignUpResponse } from 'src/app/core/auth/models/signup-response';

export abstract class AuthApiService {
  abstract checkSession(): Observable<boolean>;
  abstract signUp(email: string, password: string): Observable<SignUpResponse>;
}
