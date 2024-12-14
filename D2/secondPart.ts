import { LessThan } from "../utils/comparators";
import { RemoveFirstElement, GetFirstElement } from "../utils/util";
import { RespectsRules, BadReports, ResultP1 } from "./firstPart";
import { Plus } from "../utils/Plus";
import { AbsoluteMinus } from "../utils/Minus";

type LocalRespectsRules<
  Current extends number,
  Prev extends number,
  Ascending extends boolean
> = AbsoluteMinus<Prev, Current> extends 1 | 2 | 3
  ? Ascending extends true
    ? LessThan<Prev, Current>
    : LessThan<Current, Prev>
  : false;

type CanTolerateAFaultyLevel<
  Record extends number[],
  PrevLevel extends number,
  Ascending extends boolean,
  Acc extends number[] = []
> = Record extends [infer F extends number, ...infer T extends number[]]
  ? LocalRespectsRules<F, PrevLevel, Ascending> extends true
    ? CanTolerateAFaultyLevel<T, F, Ascending, [...Acc, PrevLevel]>
    : true extends [
        RespectsRules<[...Acc, PrevLevel, ...T]>,
        RespectsRules<[...Acc, F, ...T]>
      ][number]
    ? true
    : false
  : never;

// J'ai rajouté un test au début pout ces deux cas : // [ 28, 27, 28, 30, 33, 35, 37 ]
// [ 23, 26, 25, 23, 20 ]
// -> Si le premier elem est celui qui pose pb
type FindFaultyLevelWrapper<Record extends number[]> = RespectsRules<
  RemoveFirstElement<Record, number>
> extends true
  ? true
  : CanTolerateAFaultyLevel<
      RemoveFirstElement<Record, number>,
      GetFirstElement<Record, number>,
      LessThan<Record[0], Record[1]> extends boolean
        ? LessThan<Record[0], Record[1]>
        : never
    >;

type TestFaultyLevel = FindFaultyLevelWrapper<[23, 26, 25, 23, 20]>;

type NumberOfSafeReportsWithOneErrorMax<
  Reports extends number[][],
  Res extends 0[] = [],
  GoodReports extends number[][] = [],
  BadReports extends number[][] = []
> = Reports extends [infer F extends number[], ...infer R extends number[][]]
  ? FindFaultyLevelWrapper<F> extends true
    ? NumberOfSafeReportsWithOneErrorMax<
        R,
        [...Res, 0],
        [...GoodReports, F],
        BadReports
      >
    : NumberOfSafeReportsWithOneErrorMax<
        R,
        Res,
        GoodReports,
        [...BadReports, F]
      >
  : GoodReports["length"];

type Print40<
  Arr extends number[][],
  Acc extends number[][] = []
> = Acc["length"] extends 40
  ? [Acc, Arr]
  : Arr extends [infer F extends number[], ...infer R extends number[][]]
  ? Print40<R, [...Acc, F]>
  : [Acc, []];

type OkReports = NumberOfSafeReportsWithOneErrorMax<BadReports>;
type ResP2 = Plus<OkReports, ResultP1[0]>;
