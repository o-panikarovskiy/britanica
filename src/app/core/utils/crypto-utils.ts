export function getRandomString(length: number): string {
  return arrayBufferToString(crypto.getRandomValues(new Uint16Array(length)));
}

export async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return arrayBufferToString(hash);
}

export function createGuid(): string {
  const buf = new Uint16Array(8);
  crypto.getRandomValues(buf);
  return `${s4(buf[0])}${s4(buf[1])}-${s4(buf[2])}-${s4(buf[3])}-${s4(buf[4])}-${s4(buf[5])}${s4(buf[6])}${s4(buf[7])}`;

  function s4(num: number) {
    let ret = num.toString(16);
    while (ret.length < 4) {
      ret = '0' + ret;
    }
    return ret;
  }
}

export function arrayBufferToString(buf: ArrayBuffer): string {
  return String.fromCharCode.apply(null, (new Uint16Array(buf) as unknown) as number[]);
}

export function strToArrayBuffer(str: string): ArrayBuffer {
  const length = str.length;
  const buf = new ArrayBuffer(length * 2);
  const bufView = new Uint16Array(buf);
  for (let i = 0; i < length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export async function generageAESKey(iv: Uint8Array): Promise<CryptoKey> {
  return window.crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}

export function generateInitialVector(): Uint8Array {
  return window.crypto.getRandomValues(new Uint8Array(12));
}

export async function encryptMessage(plainText: string, key: CryptoKey, iv: Uint8Array): Promise<string> {
  const ciphertext = await window.crypto.subtle.encrypt({ name: 'AES-GCM', tagLength: 128, iv }, key, strToArrayBuffer(plainText));
  return arrayBufferToString(ciphertext);
}

export async function decryptMessage(cipherText: string, key: CryptoKey, iv: Uint8Array): Promise<string> {
  const decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', tagLength: 128, iv }, key, strToArrayBuffer(cipherText));
  return arrayBufferToString(decrypted);
}
