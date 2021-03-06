import { Injectable } from '@angular/core';
import { UsersRepository } from 'src/app/core/abstract/users.repository';
import { createDBUser, DBUser } from 'src/app/core/backend/db/db-user';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersLocalStorageRepository extends UsersRepository {
  private readonly env = environment;

  findById = async (id: string): Promise<DBUser | undefined> => {
    const users = this.getList();
    return users.find((u) => u.id === id);
  };

  findByEmail = async (email: string): Promise<DBUser | undefined> => {
    const users = this.getList();
    return users.find((u) => u.email === email);
  };

  add = async (email: string, password: string): Promise<DBUser> => {
    const user = await createDBUser(email, password);
    this.pushToList(user);
    return user;
  };

  private getList = (): DBUser[] => {
    try {
      const str = window.localStorage.getItem(this.getKeyName());
      if (!str) return [];
      return JSON.parse(str);
    } catch (error) {
      return [];
    }
  };

  private pushToList = (user: DBUser) => {
    const str = JSON.stringify([...this.getList(), user]);
    window.localStorage.setItem(this.getKeyName(), str);
  };

  private getKeyName = () => {
    return `${this.env.indexedDBName}Users`;
  };
}
