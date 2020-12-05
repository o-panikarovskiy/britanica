import { Injectable } from '@angular/core';
import { SessionRepository } from 'src/app/core/abstract/session.repository';
import { DBSession } from 'src/app/core/backend/db/db-session';
import { IStringTMap } from 'src/app/core/models/types';
import { environment } from 'src/environments/environment';

@Injectable()
export class SessionStoreageRepository extends SessionRepository {
  private readonly env = environment;

  get = async (id: string): Promise<Date | undefined> => {
    const map = this.getMap();
    const session = map[id];
    return session ? new Date(session.expDate) : void 0;
  };

  set = async (id: string, expDate: Date): Promise<void> => {
    const map = this.getMap();
    map[id] = { id, expDate };
    this.saveMap(map);
  };

  delete = async (id: string): Promise<void> => {
    const map = this.getMap();
    delete map[id];
    this.saveMap(map);
  };

  private getMap = (): IStringTMap<DBSession> => {
    try {
      const str = window.localStorage.getItem(this.getKeyName());
      if (!str) return {};
      return JSON.parse(str);
    } catch (error) {
      return {};
    }
  };

  private saveMap = (map: IStringTMap<DBSession>) => {
    const str = JSON.stringify(map);
    window.localStorage.setItem(this.getKeyName(), str);
  };

  private getKeyName = () => {
    return `${this.env.indexedDBName}Sessions`;
  };
}
