import { Digit } from "./Digit";
import {
  MapNumberPlusOne,
  FillRestWithZeroes,
  NumberToArray,
  GetFirstElement,
  RemoveZeros,
  ArrayToNumber,
  RemoveFirstElement,
  ParseInt,
} from "./util";

type MapNumberPlus = {
  0: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0]
  ];
  1: [
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
    [0, 1]
  ];
  2: [
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
    [0, 1],
    [1, 1]
  ];
  3: [
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
    [0, 1],
    [1, 1],
    [2, 1]
  ];
  4: [
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1]
  ];
  5: [
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1]
  ];
  6: [
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1]
  ];
  7: [
    [7, 0],
    [8, 0],
    [9, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1]
  ];
  8: [
    [8, 0],
    [9, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1],
    [7, 1]
  ];
  9: [
    [9, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1],
    [7, 1],
    [8, 1]
  ];
};

type AddTwoDigits<
  D1 extends Digit,
  D2 extends Digit,
  Carry extends 0 | 1
> = Carry extends 1
  ? D2 extends 9
    ? [MapNumberPlus[D1][MapNumberPlusOne[D2]][0], 1]
    : MapNumberPlus[D1][MapNumberPlusOne[D2]]
  : MapNumberPlus[D1][D2];

type A<T extends number, T2 extends number> = FillRestWithZeroes<
  NumberToArray<`${T2}`>,
  NumberToArray<`${T}`>
>;

export type Plus<
  N1 extends number,
  N2 extends number,
  ArrN1 extends Digit[] = A<N1, N2>,
  ArrN2 extends Digit[] = A<N2, N1>,
  Acc extends 0[] = [],
  Carry extends 0 | 1 = 0,
  Res extends Digit[] = [],
  InitialLength extends number = ArrN1["length"],
  IntermediateRes extends [Digit, 0 | 1] = AddTwoDigits<
    GetFirstElement<ArrN1>,
    GetFirstElement<ArrN2>,
    Carry
  >
> = Acc["length"] extends InitialLength
  ? ParseInt<RemoveZeros<ArrayToNumber<Res>>>
  : Plus<
      N1,
      N2,
      RemoveFirstElement<ArrN1, Digit>,
      RemoveFirstElement<ArrN2, Digit>,
      [...Acc, 0],
      IntermediateRes[1],
      [...Res, IntermediateRes[0]],
      InitialLength
    >;

type B = Plus<1239, 1234>; // 2473
type C = Plus<999, 999>; // 141
// 1_898
// 1_998
