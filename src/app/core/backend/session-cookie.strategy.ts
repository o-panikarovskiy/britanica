import { SessionStrategy } from 'src/app/core/backend/abstract-session.stategy';

type StringAny = { [key: string]: any };

type CookieOptions = StringAny & {
  path?: string;
  expires?: Date | string;
};

export class SessionCookieStrategy extends SessionStrategy {
  async save(userId: string): Promise<void> {
    this.setCookie('britanica', userId, { 'max-age': 3600 });
  }

  async get(): Promise<string | undefined> {
    return this.getCookie('britanica');
  }

  async destroy() {
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
    let matches = window.document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return matches ? window.decodeURIComponent(matches[1]) : undefined;
  }
}
