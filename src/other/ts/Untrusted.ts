/**
 * Derived from kaya3's answer: https://stackoverflow.com/a/63155849
 */
export type Untrusted<T> = T extends Function
  ? T | null | undefined
  : T extends ReadonlyArray<infer U>
  ? UntrustedArray<U> | null | undefined
  : T extends object
  ? UntrustedObject<T> | null | undefined
  : T | null | undefined;
export interface UntrustedArray<T> extends Array<Untrusted<T>> {}
export type UntrustedObject<T> = {
  readonly [P in keyof T]: Untrusted<T[P]> | null | undefined;
};
