import { Plus } from "./Plus";

export type Sum<
  T extends number[],
  Res extends number = 0,
  Max extends number = 500,
  CurrentIter extends 0[] = []
> = CurrentIter["length"] extends Max
  ? [Res, T]
  : T extends [infer H extends number, ...infer R extends number[]]
  ? Sum<R, Plus<Res, H>, Max, [...CurrentIter, 0]> // This would need some rework
  : [Res, T];

type TestSum = Sum<[1, 2, 3, 4]>;
