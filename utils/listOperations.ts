import { LessOrEqual, GreaterThan } from "./comparators";
import { RemoveFirstElement } from "./util";

type GetFirstElement<T extends number[]> = T extends [infer H, ...infer T]
  ? H
  : never;

type GetValuesLesserOrEqThanPivot<
  List extends number[],
  Pivot extends number,
  Res extends number[] = []
> = List extends [infer H extends number, ...infer T extends number[]]
  ? LessOrEqual<H, Pivot> extends true
    ? GetValuesLesserOrEqThanPivot<T, Pivot, [...Res, H]>
    : GetValuesLesserOrEqThanPivot<T, Pivot, Res>
  : Res;

type TestGetValuesLessOrEqToPivot = GetValuesLesserOrEqThanPivot<
  [1, 2, 3, 4, 5],
  3
>;

type GetValuesGreaterThanPivot<
  List extends number[],
  Pivot extends number,
  Res extends number[] = []
> = List extends [infer H extends number, ...infer T extends number[]]
  ? GreaterThan<H, Pivot> extends true
    ? GetValuesGreaterThanPivot<T, Pivot, [...Res, H]>
    : GetValuesGreaterThanPivot<T, Pivot, Res>
  : Res;

type TestGetValuesGreaterOrEqToPivot = GetValuesGreaterThanPivot<
  [1, 2, 3, 4, 5],
  3
>;

/**
def quicksort(lst):
    if len(lst) <= 1:
        return lst

    pivot = lst[0]
    left = quicksort([val for val in lst[1:] if val <= pivot])
    right = quicksort([val for val in lst[1:] if val > pivot])
    return left + [pivot] + right
*/

export type QuickSort<
  List extends number[],
  Pivot extends number = GetFirstElement<List>
> = List["length"] extends 0 | 1
  ? List
  : List extends [infer H, ...infer T]
  ? [
      ...QuickSort<
        GetValuesLesserOrEqThanPivot<RemoveFirstElement<List, number>, Pivot>
      >,
      Pivot,
      ...QuickSort<
        GetValuesGreaterThanPivot<RemoveFirstElement<List, number>, Pivot>
      >
    ]
  : never;
