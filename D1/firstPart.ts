import { Input } from "./input";
import { QuickSort } from "../utils/listOperations";
import { AbsoluteMinus } from "../utils/Minus";
import { Plus } from "../utils/Plus";
import { Sum } from "../utils/Sum";
import { RemoveFirstElement, GetFirstElement } from "../utils/util";

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

type TestGetLines = GetLines<Input>;

type CC = TestGetLines[999];

type ParseInt<S extends string> = S extends `${infer N extends number}`
  ? N
  : never;

type ParseLines<
  I extends string[],
  FirstList extends number[] = [],
  SecondList extends number[] = [],
  Max extends number = 500,
  CurrentIter extends 0[] = []
> = CurrentIter["length"] extends Max
  ? [FirstList, SecondList, I]
  : I extends [infer F, ...infer R extends string[]]
  ? F extends `${infer FL}   ${infer SL}`
    ? ParseLines<
        R,
        [...FirstList, ParseInt<FL>],
        [...SecondList, ParseInt<SL>],
        Max,
        [...CurrentIter, 0]
      >
    : never
  : [FirstList, SecondList, I];

export type TestParseLines1 = ParseLines<TestGetLines>;
export type TestParseLines2 = ParseLines<TestParseLines1[2]>;

type Col1 = [...TestParseLines1[0], ...TestParseLines2[0]];
type Col2 = [...TestParseLines1[1], ...TestParseLines2[1]];

export type FirstListSorted = QuickSort<Col1>;

type SecondListSorted = QuickSort<Col2>;

// 10982 - 10793

type DistanceList<
  First extends number[],
  Second extends number[],
  Res extends number[] = [],
  Max extends number = 500,
  CurrentIter extends 0[] = []
> = CurrentIter["length"] extends Max
  ? [Res, First, Second]
  : First extends []
  ? Res
  : DistanceList<
      RemoveFirstElement<First, number>,
      RemoveFirstElement<Second, number>,
      [
        ...Res,
        AbsoluteMinus<
          GetFirstElement<First, number>,
          GetFirstElement<Second, number>
        >
      ],
      Max,
      [...CurrentIter, 0]
    >;

export type TestDistanceList1 = DistanceList<FirstListSorted, SecondListSorted>;
export type TestDistanceList2 = DistanceList<
  TestDistanceList1[1],
  TestDistanceList1[2]
>;

type TestDistanceList = [...TestDistanceList1[0], ...TestDistanceList2[0]];

type SumOfDistances1 = Sum<TestDistanceList>;
type SumOfDistances2 = Sum<SumOfDistances1[1]>;

type Res = Plus<SumOfDistances1[0], SumOfDistances2[0]>;
// 1_970_720
