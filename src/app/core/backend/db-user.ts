import { User } from 'src/app/core/models/user';

export type DBUser = User & { password: string };
