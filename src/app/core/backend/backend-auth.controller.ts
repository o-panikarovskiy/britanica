import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { SessionStrategy } from 'src/app/core/backend/abstract-session.stategy';
import { UsersRepository } from 'src/app/core/backend/abstract-users.repository';
import { comparePassword, DBUser, toClientUser } from 'src/app/core/backend/db-user';
import { AppError } from 'src/app/core/models/app-error';
import { SignInResponse, SignUpResponse } from 'src/app/core/models/signup';
import { AuthApiService } from 'src/app/core/services/auth-api.service';

@Injectable()
export class BackendMockAuthController extends AuthApiService {
  constructor(
    private readonly usersRep: UsersRepository, //
    private readonly sessionStrategy: SessionStrategy,
  ) {
    super();
  }

  checkSession(): Observable<boolean> {
    return from(this.checkSessionFlow());
  }

  signIn(username: string, password: string): Observable<SignInResponse> {
    return from(this.signInFlow(username, password));
  }

  signUp(email: string, password: string): Observable<SignUpResponse> {
    return from(this.signUpFlow(email, password));
  }

  logout(): Observable<void> {
    return from(this.sessionStrategy.destroy());
  }

  private async checkSessionFlow(): Promise<boolean> {
    const sid = await this.sessionStrategy.get();
    if (!sid) return false;

    const user = await this.usersRep.findById(sid);
    return !!user;
  }

  private async signInFlow(username: string, password: string): Promise<SignInResponse> {
    const err = new AppError('Invalid username or password.', 'AuthError');

    const user = await this.usersRep.findByEmail(username);
    if (!user) throw err;

    const isEquals = await comparePassword(user, password);
    if (!isEquals) throw err;

    const sid = await this.createSession(user);
    return { sid, user: toClientUser(user) };
  }

  private async signUpFlow(email: string, password: string): Promise<SignUpResponse> {
    const exUser = await this.usersRep.findByEmail(email);
    if (exUser) {
      throw new AppError('User already exists.', 'UserAlreadyExists');
    }

    const user = await this.usersRep.add(email, password);
    const sid = await this.createSession(user);
    return { sid, user: toClientUser(user) };
  }

  private async createSession(user: DBUser) {
    const sid = user.ID;
    await this.sessionStrategy.save(sid);
    return sid;
  }
}
