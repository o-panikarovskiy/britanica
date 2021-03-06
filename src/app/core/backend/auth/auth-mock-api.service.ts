import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AuthApiService } from 'src/app/core/abstract/auth-api.service';
import { SessionStrategy } from 'src/app/core/abstract/session.stategy';
import { UsersRepository } from 'src/app/core/abstract/users.repository';
import { comparePassword, DBUser, toClientUser } from 'src/app/core/backend/db/db-user';
import { AppError } from 'src/app/core/models/app-error';
import { SignInResponse, SignUpResponse } from 'src/app/core/models/signup';

@Injectable()
export class AuthMockApiService extends AuthApiService {
  constructor(
    private readonly usersRep: UsersRepository, //
    private readonly sessionStrategy: SessionStrategy,
  ) {
    super();
  }

  checkSession = (): Observable<boolean> => {
    return from(this.sessionStrategy.check());
  };

  signIn = (username: string, password: string): Observable<SignInResponse> => {
    return from(this.signInFlow(username, password));
  };

  signUp = (email: string, password: string): Observable<SignUpResponse> => {
    return from(this.signUpFlow(email, password));
  };

  logout = (): Observable<void> => {
    return from(this.sessionStrategy.destroy());
  };

  private signInFlow = async (username: string, password: string): Promise<SignInResponse> => {
    const err = new AppError('Invalid username or password.', 'AuthError');

    const user = await this.usersRep.findByEmail(username);
    if (!user) throw err;

    const isEquals = await comparePassword(user, password);
    if (!isEquals) throw err;

    const sid = await this.createSession(user);
    return { sid, user: toClientUser(user) };
  };

  private signUpFlow = async (email: string, password: string): Promise<SignUpResponse> => {
    const exUser = await this.usersRep.findByEmail(email);
    if (exUser) {
      throw new AppError('User already exists.', 'UserAlreadyExists');
    }

    const user = await this.usersRep.add(email, password);
    const sid = await this.createSession(user);
    return { sid, user: toClientUser(user) };
  };

  private createSession = async (user: DBUser) => {
    const sid = user.id;
    await this.sessionStrategy.save(sid);
    return sid;
  };
}
