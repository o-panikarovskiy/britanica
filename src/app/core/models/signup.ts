import { User } from 'src/app/core/models/user';

export type SignInRequest = {
  readonly username: string;
  readonly password: string;
};

export type SignUpRequest = {
  readonly email: string;
  readonly password: string;
};

export type SignUpResponse = {
  readonly sid: string;
  readonly user: User;
};

export type SignInResponse = SignUpResponse;
