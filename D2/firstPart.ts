import { Input } from "./input";
import { QuickSort } from "../utils/listOperations";
import { AbsoluteMinus } from "../utils/Minus";

type Reverse<Arr extends number[], Res extends number[] = []> = Arr extends [
  infer H extends number,
  ...infer R extends number[]
]
  ? Reverse<R, [H, ...Res]>
  : Res;

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false;

type GetFirstLine<I extends string> = I extends `${infer F}\n${infer R}`
  ? F
  : I;

type RemoveFirstLine<I extends string> = I extends `${infer F}\n${infer R}`
  ? R
  : I;

type GetLines<
  I extends string,
  Res extends string[] = []
> = I extends `${infer F}\n${infer R}`
  ? GetLines<RemoveFirstLine<I>, [...Res, GetFirstLine<I>]>
  : [...Res, I];

type ParseLine<
  L extends string,
  Res extends number[] = []
> = L extends `${infer F extends number} ${infer R}`
  ? ParseLine<R, [...Res, F]>
  : [...Res, L extends `${infer I extends number}` ? I : never];

type Lines = GetLines<Input>;
type ParseAllLines<
  L extends string[],
  Res extends number[][] = []
> = L extends [infer H extends string, ...infer R extends string[]]
  ? ParseAllLines<R, [...Res, ParseLine<H>]>
  : Res;

type IsMonotonous<Arr extends number[]> =
  QuickSort<Arr> extends infer SortedArr extends number[]
    ? Equal<Arr, SortedArr> extends true
      ? true
      : Equal<Arr, Reverse<SortedArr>>
    : never;
type TestMonotonous = IsMonotonous<[1, 2, 3, 4]>;
type TestMonotonous2 = IsMonotonous<[1, 4, 2, 3]>;
type TestMonotonous3 = IsMonotonous<[4, 3, 2, 1]>;
type TestMonotonous4 = IsMonotonous<[28, 27, 28, 30, 33, 35, 37]>;

type RecRespectsRules<
  Arr extends number[],
  LastSeen extends number
> = Arr extends [infer H extends number, ...infer R extends number[]]
  ? Equal<LastSeen, H> extends true
    ? false
    : AbsoluteMinus<LastSeen, H> extends 1 | 2 | 3
    ? RecRespectsRules<R, H>
    : false
  : true;

export type RespectsRules<Arr extends number[]> = IsMonotonous<Arr> extends true
  ? Arr extends [infer H extends number, ...infer R extends number[]]
    ? RecRespectsRules<R, H>
    : never
  : false;
type TestRespectsRules = RespectsRules<[12, 9, 8, 7]>;

type ParsedLines = ParseAllLines<Lines>;

type ComputeNumberOfSafeReports<
  Reports extends number[][],
  Acc extends 0[] = [],
  BadReports extends number[][] = []
> = Reports extends [infer F extends number[], ...infer R extends number[][]]
  ? ComputeNumberOfSafeReports<
      R,
      RespectsRules<F> extends true ? [...Acc, 0] : Acc,
      RespectsRules<F> extends false ? [...BadReports, F] : BadReports
    >
  : [Acc["length"], BadReports];

export type ResultP1 = ComputeNumberOfSafeReports<ParsedLines>;
export type BadReports = ResultP1[1];
