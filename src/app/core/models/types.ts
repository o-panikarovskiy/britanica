export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PickRequired<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>;

export interface IStringTMap<T> {
  [key: string]: T;
}
export interface INumberTMap<T> {
  [key: number]: T;
}

export type StronglyKeyedMap<T extends string | number, V> = { [k in T]: V };

export interface IStringAnyMap extends IStringTMap<any> {}
export interface INumberAnyMap extends INumberTMap<any> {}

export interface IStringStringMap extends IStringTMap<string> {}
export interface INumberStringMap extends INumberTMap<string> {}

export interface IStringNumberMap extends IStringTMap<number> {}
export interface INumberNumberMap extends INumberTMap<number> {}

export interface IStringBooleanMap extends IStringTMap<boolean> {}
export interface INumberBooleanMap extends INumberTMap<boolean> {}
