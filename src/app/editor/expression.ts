import jsep, { Identifier } from "jsep";
import { Value } from "./types";

const binops: Record<string, (a: any, b: any) => any> = {
  "||": (a: any, b: any) => a || b,
  "&&": (a: any, b: any) => a && b,
  "|": (a: number, b: number) => a | b,
  "^": (a: number, b: number) => a ^ b,
  "&": (a: number, b: number) => a & b,
  "==": (a: any, b: any) => a == b,
  "!=": (a: any, b: any) => a != b,
  "===": (a: any, b: any) => a === b,
  "!==": (a: any, b: any) => a !== b,
  "<": (a: number, b: number) => a < b,
  ">": (a: number, b: number) => a > b,
  "<=": (a: number, b: number) => a <= b,
  ">=": (a: number, b: number) => a >= b,
  "<<": (a: number, b: number) => a << b,
  ">>": (a: number, b: number) => a >> b,
  ">>>": (a: number, b: number) => a >>> b,
  "+": (a: any, b: any) => a + b,
  "-": (a: number, b: number) => a - b,
  "*": (a: number, b: number) => a * b,
  "/": (a: number, b: number) => a / b,
  "%": (a: number, b: number) => a % b,
};

const unops: Record<string, (a: any) => any> = {
  "-": (a: any) => -a,
  "+": (a: any) => +a,
  "~": (a: any) => ~a,
  "!": (a: any) => !a,
};

const reduceOps: Record<
  string,
  (state: any, row: Record<string, Value>, expressions: AnyExpression[]) => any
> = {
  sum: (state, row, expressions) => state + evaluate(expressions[0], row),
  count: (state, row, expression) => state + 1,
};

type StatefulCallExpression = jsep.CallExpression & {
  state?: number;
};

export type AnyExpression =
  | jsep.BinaryExpression
  | jsep.Identifier
  | jsep.Literal
  | jsep.UnaryExpression
  | StatefulCallExpression;

export function evaluate(
  node: AnyExpression,
  context: Record<string, any>
): any {
  switch (node.type) {
    case "BinaryExpression":
      const { left, right, operator } = node;
      return binops[operator](
        evaluate(left as AnyExpression, context),
        evaluate(right as AnyExpression, context)
      );

    case "Identifier":
      return context[node.name];

    case "Literal":
      return node.value;

    case "UnaryExpression":
      return unops[node.operator](
        evaluate(node.argument as AnyExpression, context)
      );

    case "CallExpression": {
      return node.state;
    }

    default:
      return undefined;
  }
}

export function reduce(
  memo: AnyExpression,
  row: Record<string, Value>
): AnyExpression {
  switch (memo.type) {
    case "BinaryExpression": {
      return {
        ...memo,
        left: reduce(memo.left as AnyExpression, row),
        right: reduce(memo.right as AnyExpression, row),
      };
    }

    case "UnaryExpression": {
      const { argument } = memo;
      return {
        ...memo,
        argument: reduce(memo.argument as AnyExpression, row),
      };
    }

    case "CallExpression": {
      const { name } = memo.callee as Identifier;
      const state = memo.state || 0;
      return {
        ...memo,
        state: reduceOps[name](state, row, memo.arguments as AnyExpression[]),
      };
    }

    default: {
      return memo;
    }
  }
}

export function parse(expression: string): AnyExpression {
  return jsep(expression) as AnyExpression;
}
