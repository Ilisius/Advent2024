import { LessThan } from "./comparators";
import { Digit } from "./Digit";

export type ParseInt<T> = T extends `${infer N extends number}` ? N : 0;

export type RemoveFirstElement<T extends TypeOf[], TypeOf> = T extends [
  infer Head,
  ...infer Tail extends TypeOf[]
]
  ? [...Tail]
  : [];

export type GetFirstElement<T extends TypeOf[], TypeOf = Digit> = T extends [
  infer Head,
  ...infer Tail
]
  ? Head
  : never;

export type ArrayToNumber<Arr extends Digit[] = []> = Arr extends [
  infer First extends Digit,
  ...infer Rest extends Digit[]
]
  ? `${ArrayToNumber<Rest>}${First}`
  : "";

export type NumberToArray<
  N extends string,
  Acc extends Digit[] = []
> = N extends `${infer First}${infer Rest}`
  ? NumberToArray<Rest, [ParseInt<First>, ...Acc]>
  : Acc extends Digit[]
  ? Acc
  : never;

export type FillRestWithZeroes<
  ArrN1 extends Digit[],
  ArrN2 extends Digit[]
> = LessThan<ArrN2["length"], ArrN1["length"]> extends true
  ? FillRestWithZeroes<ArrN1, [...ArrN2, 0]>
  : [...ArrN2, 0];

export type RemoveZeros<S extends string> =
  S extends `${infer First}${infer Rest}`
    ? First extends "0"
      ? RemoveZeros<Rest>
      : S
    : S;

export type MapNumberPlusOne = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
