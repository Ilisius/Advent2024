import type { Plus } from "./Plus";
import type { GreaterThan } from "./comparators";

type RecMulitply<
  D1 extends number,
  D2 extends number,
  Res extends number = 0,
  Acc extends 0[] = []
> = Acc["length"] extends D2
  ? Res
  : RecMulitply<D1, D2, Plus<Res, D1>, [...Acc, 0]>;

export type SimpleMultiply<D1 extends number, D2 extends number> = GreaterThan<
  D1,
  D2
> extends true
  ? RecMulitply<D1, D2>
  : RecMulitply<D2, D1>;

// type TestSimpleMultiply = SimpleMultiply<3, 4>;
// type TestSimpleMultiply2 = SimpleMultiply<4, 3>;
// type TestSimpleMultiply3 = SimpleMultiply<9, 9>;
// type TestSimpleMultiply4 = SimpleMultiply<9, 9999>;
