import { GetFirstElement, RemoveFirstElement } from "./util";
import { Digit } from "./Digit";

type GreaterNumber = {
  0: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  1: [-1, 0, 1, 1, 1, 1, 1, 1, 1, 1];
  2: [-1, -1, 0, 1, 1, 1, 1, 1, 1, 1];
  3: [-1, -1, -1, 0, 1, 1, 1, 1, 1, 1];
  4: [-1, -1, -1, -1, 0, 1, 1, 1, 1, 1];
  5: [-1, -1, -1, -1, -1, 0, 1, 1, 1, 1];
  6: [-1, -1, -1, -1, -1, -1, 0, 1, 1, 1];
  7: [-1, -1, -1, -1, -1, -1, -1, 0, 1, 1];
  8: [-1, -1, -1, -1, -1, -1, -1, -1, 0, 1];
  9: [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0];
};

// 1 -> yes, 0 not sure
type IsAInferiorToB<A extends number[], B extends number[]> = A extends []
  ? B extends []
    ? 0
    : 1
  : IsAInferiorToB<
      RemoveFirstElement<A, number>,
      RemoveFirstElement<B, number>
    >;

// A -> true, B -> false, Eq -> 0
type CompareTwoLengths<A extends number[], B extends number[]> = IsAInferiorToB<
  A,
  B
> extends 1
  ? false
  : IsAInferiorToB<B, A> extends 0
  ? 0
  : true;

//type A = CompareTwoLengths<[0, 1, 2, 3], [0, 1, 2, 3, 4]>;

type ResToBoolean<N extends 0 | 1 | -1> = N extends 0
  ? 0
  : N extends 1
  ? false
  : true;

type CompareNumberByNumber<A extends number[], B extends number[]> = A extends [
  infer HeadA extends Digit,
  ...infer TailA
]
  ? B extends [infer HeadB extends Digit, ...infer TailB]
    ? ResToBoolean<GreaterNumber[HeadA][HeadB]> extends 0
      ? CompareNumberByNumber<
          RemoveFirstElement<A, number>,
          RemoveFirstElement<B, number>
        >
      : ResToBoolean<GreaterNumber[HeadA][HeadB]>
    : false
  : false;

type NumberAsStringToArray<
  T extends string,
  Acc extends number[] = []
> = T extends `${infer First extends number}${infer Rest}`
  ? NumberAsStringToArray<`${Rest}`, [...Acc, First]>
  : Acc;
type B = NumberAsStringToArray<"1234">;

export type GreaterThan<
  T extends number,
  U extends number,
  TT extends number[] = NumberAsStringToArray<`${T}`>,
  UU extends number[] = NumberAsStringToArray<`${U}`>
> = CompareTwoLengths<TT, UU> extends infer A
  ? A extends boolean
    ? A
    : CompareNumberByNumber<TT, UU>
  : never;

export type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false;

export type GreaterOrEqual<T extends number, U extends number> = Equal<
  T,
  U
> extends true
  ? true
  : GreaterThan<T, U>;

export type LessThan<T extends number, U extends number> = Equal<
  T,
  U
> extends true
  ? false
  : GreaterOrEqual<U, T>;

export type LessOrEqual<T extends number, U extends number> = Equal<
  T,
  U
> extends true
  ? true
  : LessThan<T, U>;

// type TestLessOrEqual = LessOrEqual<1, 2>; // true
// type TestLessOrEqual2 = LessOrEqual<1, 1>; // true
// type TestLessOrEqual3 = LessOrEqual<2, 1>; // false

// type TestLessThan = LessThan<1, 2>; // true
// type TestLessThan2 = LessThan<2, 2>; // false
// type TestLessThan3 = LessThan<2, 1>; // false

// type TestGreaterThan = GreaterThan<2, 1>; // true
// type TestGreaterThan2 = GreaterThan<2, 2>; // false

// type TestGreaterOrEqual = GreaterOrEqual<2, 1>; // true
// type TestGreaterOrEqual2 = GreaterOrEqual<2, 2>; // true
// type TestGreaterOrEqual3 = GreaterOrEqual<1, 2>; // false

// type TestEqual = Equal<1, 1>;
// type TestEqual2 = Equal<1, 2>;
// type TestEqual3 = Equal<2, 1>;

export type Min<
  T extends number[],
  Res extends number = GetFirstElement<T, number>
> = T extends [infer Head extends number, ...infer Tail extends number[]]
  ? Min<Tail, LessThan<Head, Res> extends true ? Head : Res>
  : Res;

//type TestMin = Min<[9, 2, 3, 4, 1]>; // 1
