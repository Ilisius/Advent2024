import { LessThan } from "./comparators";
import { Digit } from "./Digit";
import {
  GetFirstElement,
  RemoveFirstElement,
  MapNumberPlusOne,
  NumberToArray,
  FillRestWithZeroes,
  ParseInt,
  RemoveZeros,
  ArrayToNumber,
} from "./util";

type MapNumberMinus = {
  0: [
    [0, 0],
    [9, 1],
    [8, 1],
    [7, 1],
    [6, 1],
    [5, 1],
    [4, 1],
    [3, 1],
    [2, 1],
    [1, 1]
  ];
  1: [
    [1, 0],
    [0, 0],
    [9, 1],
    [8, 1],
    [7, 1],
    [6, 1],
    [5, 1],
    [4, 1],
    [3, 1],
    [2, 1]
  ];
  2: [
    [2, 0],
    [1, 0],
    [0, 0],
    [9, 1],
    [8, 1],
    [7, 1],
    [6, 1],
    [5, 1],
    [4, 1],
    [3, 1]
  ];
  3: [
    [3, 0],
    [2, 0],
    [1, 0],
    [0, 0],
    [9, 1],
    [8, 1],
    [7, 1],
    [6, 1],
    [5, 1],
    [4, 1]
  ];
  4: [
    [4, 0],
    [3, 0],
    [2, 0],
    [1, 0],
    [0, 0],
    [9, 1],
    [8, 1],
    [7, 1],
    [6, 1],
    [5, 1]
  ];
  5: [
    [5, 0],
    [4, 0],
    [3, 0],
    [2, 0],
    [1, 0],
    [0, 0],
    [9, 1],
    [8, 1],
    [7, 1],
    [6, 1]
  ];
  6: [
    [6, 0],
    [5, 0],
    [4, 0],
    [3, 0],
    [2, 0],
    [1, 0],
    [0, 0],
    [9, 1],
    [8, 1],
    [7, 1]
  ];
  7: [
    [7, 0],
    [6, 0],
    [5, 0],
    [4, 0],
    [3, 0],
    [2, 0],
    [1, 0],
    [0, 0],
    [9, 1],
    [8, 1]
  ];
  8: [
    [8, 0],
    [7, 0],
    [6, 0],
    [5, 0],
    [4, 0],
    [3, 0],
    [2, 0],
    [1, 0],
    [0, 0],
    [9, 1]
  ];
  9: [
    [9, 0],
    [8, 0],
    [7, 0],
    [6, 0],
    [5, 0],
    [4, 0],
    [3, 0],
    [2, 0],
    [1, 0],
    [0, 0]
  ];
};

type SubtractTwoDigits<
  D1 extends Digit,
  D2 extends Digit,
  Carry extends 0 | 1
> = Carry extends 1
  ? D2 extends 9
    ? [MapNumberMinus[D1][MapNumberPlusOne[D2]][0], 1]
    : MapNumberMinus[D1][MapNumberPlusOne[D2]]
  : MapNumberMinus[D1][D2];

type Minus<
  N1 extends number,
  N2 extends number,
  ArrN1 extends Digit[] = NumberToArray<`${N1}`>,
  ArrN2 extends Digit[] = FillRestWithZeroes<ArrN1, NumberToArray<`${N2}`>>,
  Acc extends 0[] = [],
  Carry extends 0 | 1 = 0,
  Res extends Digit[] = [],
  IntermediateRes extends [Digit, 0 | 1] = SubtractTwoDigits<
    GetFirstElement<ArrN1>,
    GetFirstElement<ArrN2>,
    Carry
  >
> = Acc["length"] extends NumberToArray<`${N1}`>["length"]
  ? ParseInt<RemoveZeros<ArrayToNumber<Res>>>
  : Minus<
      N1,
      N2,
      RemoveFirstElement<ArrN1, Digit>,
      RemoveFirstElement<ArrN2, Digit>,
      [...Acc, 0],
      IntermediateRes[1],
      [...Res, IntermediateRes[0]]
    >;

export type AbsoluteMinus<N1 extends number, N2 extends number> = LessThan<
  N1,
  N2
> extends true
  ? Minus<N2, N1>
  : Minus<N1, N2>;

type TestMinus = AbsoluteMinus<100, 200>; // 100
type TestMinus2 = AbsoluteMinus<36510, 34936>; // 1574
type TestMinus3 = AbsoluteMinus<1000, 91>; // donne 1009 au lieu de 909
