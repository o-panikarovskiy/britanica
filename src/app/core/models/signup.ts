import { User } from 'src/app/core/models/user';

export type SignInRequest = {
  username: string;
  password: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
};

export type SignUpResponse = {
  sid: string;
  user: User;
};

export type SignInResponse = SignUpResponse;
