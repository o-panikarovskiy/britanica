import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { SessionStrategy } from 'src/app/core/backend/abstract-session.stategy';
import { UsersRepository } from 'src/app/core/backend/abstract-users.repository';
import { DBUser } from 'src/app/core/backend/db-user';
import { AppError } from 'src/app/core/models/app-error';
import { SignInResponse, SignUpResponse } from 'src/app/core/models/signup';
import { User } from 'src/app/core/models/user';
import { AuthApiService } from 'src/app/core/services/auth-api.service';

@Injectable()
export class AuthController extends AuthApiService {
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

  private async checkSessionFlow(): Promise<boolean> {
    const sid = await this.sessionStrategy.retriveSessionId();
    if (!sid) return false;

    const user = await this.usersRep.findUserById(sid);
    return !!user;
  }

  private async signInFlow(username: string, password: string): Promise<SignInResponse> {
    const dbUser = await this.usersRep.findUserByEmail(username);
    if (!dbUser || dbUser.password !== password) {
      throw new AppError('Invalid username or password.', 'AuthError');
    }

    const sid = await this.createSession(dbUser);
    return { sid, user: this.toClientUser(dbUser) };
  }

  private async signUpFlow(email: string, password: string): Promise<SignUpResponse> {
    const exUser = await this.usersRep.findUserByEmail(email);
    if (exUser) {
      throw new AppError('User already exists.', 'UserAlreadyExists');
    }

    const dbUser = await this.usersRep.createUser(email, password);
    const sid = await this.createSession(dbUser);
    return { sid, user: this.toClientUser(dbUser) };
  }

  private toClientUser(dbUser: DBUser): User {
    return { email: dbUser.email, id: dbUser.id };
  }

  private async createSession(user: DBUser) {
    const sid = user.id;
    await this.sessionStrategy.saveSession(sid);
    return sid;
  }
}
