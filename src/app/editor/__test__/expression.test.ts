import { parse, reduce as reduceFn, evaluate } from "../expression";

describe("reduce", () => {
  test("it reduce single entry", () => {
    const rows = [{ $age: 12 }, { $age: 40 }];

    const state = rows.reduce(reduceFn, parse("sum($age) / count()"));
    console.log(state);

    const result = evaluate(state, {});
    console.log(result);
  });
});
