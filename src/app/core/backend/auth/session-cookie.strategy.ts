import { Injectable } from '@angular/core';
import { SessionRepository } from 'src/app/core/abstract/session.repository';
import { SessionStrategy } from 'src/app/core/abstract/session.stategy';
import { createGuid } from 'src/app/core/utils/crypto-utils';
import { environment } from 'src/environments/environment';

type StringAny = { [key: string]: any };

type CookieOptions = StringAny & {
  path?: string;
  expires?: Date | string;
};

@Injectable()
export class SessionCookieStrategy extends SessionStrategy {
  private readonly env = environment;

  constructor(private readonly repository: SessionRepository) {
    super();
  }

  save = async (): Promise<void> => {
    const id = createGuid();
    const expDate = new Date();
    expDate.setSeconds(expDate.getSeconds() + this.env.sessionMaxAge);

    await this.repository.set(id, expDate);
    this.setCookie('britannica', id, { 'max-age': this.env.sessionMaxAge });
  };

  check = async (): Promise<boolean> => {
    const id = await this.get();
    if (!id) return false;

    const expDate = await this.repository.get(id);
    if (!expDate) return false;

    return expDate.getTime() >= Date.now();
  };

  get = async (): Promise<string | undefined> => {
    return this.getCookie('britannica');
  };

  destroy = async (): Promise<void> => {
    const id = await this.get();
    this.setCookie('britannica', '', { 'max-age': -1 });
    if (id) return this.repository.delete(id);
  };

  private setCookie = (name: string, value: string, options?: CookieOptions) => {
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
  };

  private getCookie = (name: string) => {
    const matches = window.document.cookie.match(
      // eslint-disable-next-line no-useless-escape
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
    );
    return matches ? window.decodeURIComponent(matches[1]) : undefined;
  };
}
