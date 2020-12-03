export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PickRequired<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>;
