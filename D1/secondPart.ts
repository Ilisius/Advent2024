import type { TestParseLines1, TestParseLines2 } from "./firstPart";
import type { Plus } from "../utils/Plus";
import type { SimpleMultiply } from "../utils/SimpleMultiply";

type GetAllOccurencesOf<
  Arr extends number[],
  Element extends number,
  Occ extends any[] = []
> = Arr extends [infer H, ...infer T extends number[]]
  ? Element extends H
    ? GetAllOccurencesOf<T, Element, [...Occ, 0]>
    : GetAllOccurencesOf<T, Element, Occ>
  : Occ["length"];

type ArrayToObjectWithOccurences<T extends number[], Obj = {}> = T extends [
  infer H extends number,
  ...infer Tail extends number[]
]
  ? H extends keyof Obj
    ? ArrayToObjectWithOccurences<Tail, Obj>
    : ArrayToObjectWithOccurences<
        Tail,
        Obj & { [k in H]: GetAllOccurencesOf<T, H> }
      >
  : Obj;

type MergeTwoObjects<
  Obj1 extends { [x: number]: number },
  Obj2 extends { [x: number]: number }
> = {
  [k in keyof Obj1]: k extends keyof Obj2
    ? Obj1[k] extends number
      ? Obj2[k] extends number
        ? Plus<Obj1[k], Obj2[k]>
        : never
      : never
    : Obj1[k];
} & {
  [k in keyof Obj2 as k extends keyof Obj1 ? never : k]: Obj2[k];
};

type FirstHalfCol1 = ArrayToObjectWithOccurences<TestParseLines1[0]>;
type SecondHalfCol1 = ArrayToObjectWithOccurences<TestParseLines2[0]>;

type Col1 = MergeTwoObjects<FirstHalfCol1, SecondHalfCol1>;

type FirstHalfCol2 = ArrayToObjectWithOccurences<TestParseLines1[1]>;
type SecondHalfCol2 = ArrayToObjectWithOccurences<TestParseLines2[1]>;

type Col2 = MergeTwoObjects<FirstHalfCol2, SecondHalfCol2>;

type FilterOutUselessValues<Obj1, Obj2> = {
  [k in keyof Obj1 as k extends keyof Obj2 ? k : never]: Obj1[k];
};

type FilteredCol1 = FilterOutUselessValues<Col1, Col2>;
type FilteredCol2 = FilterOutUselessValues<Col2, Col1>;

type FilterListWithRemainings<
  T extends number[],
  FilteredObject,
  Set extends number[] = []
> = T extends [infer Head extends number, ...infer Tail extends number[]]
  ? Head extends keyof FilteredObject
    ? Head extends Set[number]
      ? FilterListWithRemainings<Tail, FilteredObject, Set>
      : FilterListWithRemainings<Tail, FilteredObject, [...Set, Head]>
    : FilterListWithRemainings<Tail, FilteredObject, Set>
  : Set;

type ObjectWithValues = {
  [k in keyof FilteredCol1]: k extends keyof FilteredCol2
    ? SimpleMultiply<FilteredCol1[k], SimpleMultiply<FilteredCol2[k], k>>
    : never;
};

type SumOfValues<T extends number[], O, Res extends number = 0> = T extends [
  infer Head extends number,
  ...infer Tail extends number[]
]
  ? Head extends keyof O
    ? O[Head] extends number
      ? SumOfValues<Tail, O, Plus<Res, O[Head]>>
      : never
    : never
  : Res;

type SetOfFirstHalfCol1 = FilterListWithRemainings<
  TestParseLines1[0],
  ObjectWithValues
>;
type SetOfSecondHalfCol1 = FilterListWithRemainings<
  TestParseLines2[0],
  ObjectWithValues
>;

type SetOfCol1 = [...SetOfFirstHalfCol1, ...SetOfSecondHalfCol1];

type FinalSet = FilterListWithRemainings<SetOfCol1, ObjectWithValues>;

type Res = SumOfValues<FinalSet, ObjectWithValues>;
// 17191599
