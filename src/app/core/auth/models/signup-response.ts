import { User } from 'src/app/core/auth/models/user';

export type SignUpResponse = {
  sid: string;
  user: User;
};
