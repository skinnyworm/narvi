import { group, OutputSpec } from "../group";
import { DataSource } from "../types";
import { autoSales } from "../mocks/dataset";

test("it should group", () => {
  const datasource: DataSource = {
    data: [
      [12, "Melbourne"],
      [14, "Melbourne"],
      [21, "Sydney"],
    ],
    meta: {
      title: "Example",
      schema: [
        {
          field: "age",
          type: "number",
        },
        {
          field: "city",
          type: "string",
        },
      ],
    },
  };

  const label = "$city";

  const output = [
    {
      name: "avgAge",
      expression: "sum($age)/count()",
    },
    {
      name: "count",
      expression: "count()",
    },
    {
      name: "sum",
      expression: "sum($age)",
    },
  ];

  const result = group(datasource, label, output);

  expect(result).toEqual({
    Melbourne: {
      avgAge: 13,
      count: 2,
      sum: 26,
    },
    Sydney: {
      avgAge: 21,
      count: 1,
      sum: 21,
    },
  });
});

test("Sales data", () => {
  const label = "$销售";
  const output: OutputSpec[] = [
    {
      name: "店访客数",
      expression: "sum($到店访客数)",
      format: "number",
    },
    {
      name: "订单数",
      expression: "sum($订单数量)",
      format: "number",
    },
    {
      name: "成交率",
      expression: "sum($订单数量)/sum($到店访客数)",
      format: "percent",
    },
    {
      name: "客单价",
      expression: "sum($订单金额)/count()",
      format: "currency",
    },
  ];
  const result = group(autoSales, label, output);
  console.log(result);
});
