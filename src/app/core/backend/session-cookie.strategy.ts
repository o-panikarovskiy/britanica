import { Injectable } from '@angular/core';
import { SessionStrategy } from 'src/app/core/backend/abstract-session.stategy';
import { UsersRepository } from 'src/app/core/backend/abstract-users.repository';
import { environment } from 'src/environments/environment';

type StringAny = { [key: string]: any };

type CookieOptions = StringAny & {
  path?: string;
  expires?: Date | string;
};

@Injectable()
export class SessionCookieStrategy extends SessionStrategy {
  private readonly env = environment;

  constructor(userRep: UsersRepository) {
    super(userRep);
  }

  async save(userId: string): Promise<void> {
    this.setCookie('britanica', userId, { 'max-age': this.env.sessionMaxAge });
  }

  async get(): Promise<string | undefined> {
    return this.getCookie('britanica');
  }

  async destroy(): Promise<void> {
    this.setCookie('britanica', '', { 'max-age': -1 });
  }

  private setCookie(name: string, value: string, options?: CookieOptions) {
    const opt: CookieOptions = {
      path: '/',
      ...options,
    };

    if (opt.expires instanceof Date) {
      opt.expires = opt.expires.toUTCString();
    }

    let updatedCookie = window.encodeURIComponent(name) + '=' + window.encodeURIComponent(value);

    for (const optionKey in opt) {
      updatedCookie += '; ' + optionKey;
      const optionValue = opt[optionKey];
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }

    window.document.cookie = updatedCookie;
  }

  private getCookie(name: string) {
    const matches = window.document.cookie.match(
      // eslint-disable-next-line no-useless-escape
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
    );
    return matches ? window.decodeURIComponent(matches[1]) : undefined;
  }
}
