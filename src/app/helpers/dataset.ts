import { Value } from "app/types";
import { createDataSet } from "./createDataSet";
import * as random from "./random";
import range from "lodash/range";

const brand = random.label([
  {
    label: "大众",
    weight: 2,
  },
  {
    label: "领克",
    weight: 0.3,
  },
  {
    label: "长城",
    weight: 1.5,
  },
  {
    label: "通用",
    weight: 0.7,
  },
]);

const brandModel = (prev: Value[]) => {
  // 品牌
  switch (prev[3]) {
    case "大众":
      return random.label([
        {
          label: "新帕萨特",
          weight: 2,
        },
      ])();

    case "领克":
      return random.label([
        {
          label: "领克03",
          weight: 2,
        },
        {
          label: "领克01",
          weight: 1,
        },
      ])();

    case "长城":
      return random.label([
        {
          label: "哈弗H6",
          weight: 1,
        },
      ])();

    case "通用":
      return random.label([
        {
          label: "君威",
          weight: 1,
        },
      ])();

    default:
      return "未知车型";
  }
};

const modelSalePrice = (prev: Value[]) => {
  //"车型"
  switch (prev[4]) {
    case "新帕萨特":
      return random.number(180000, 220000)();
    case "领克03":
      return random.number(120000, 180000)();
    case "领克01":
      return random.number(130000, 160000)();
    case "哈弗H6":
      return random.number(80000, 110000)();
    case "君威":
      return random.number(110000, 170000)();
    default:
      return 100000;
  }
};

const salesPerson = random.label([
  {
    label: "章霰",
    weight: 0.5,
  },
  {
    label: "黎思",
    weight: 1,
  },
  {
    label: "旺武",
    weight: 2,
  },
  {
    label: "邹柳",
    weight: 1.4,
  },
]);

const dealer = random.label([
  {
    label: "永达集团",
    weight: 2,
  },
  {
    label: "浙江物产元通",
    weight: 2,
  },
  {
    label: "广汇汽车",
    weight: 0.4,
  },
  {
    label: "中升集团",
    weight: 0.7,
  },
]);

const city = random.label([
  {
    label: "上海",
    weight: 2,
  },
  {
    label: "北京",
    weight: 2,
  },
  {
    label: "合肥",
    weight: 0.4,
  },
  {
    label: "武汉",
    weight: 0.7,
  },
]);

export const autoSales = createDataSet(
  "autoSales",
  "销售数据",
  [
    {
      field: "日期",
      type: "string",
      value: random.label(
        range(1, 13).map<random.WeightedLabel>((i) => ({
          label: `2020年${i}月`,
          weight: 1 - (i % 3) / 10,
        }))
      ),
    },
    {
      field: "城市",
      type: "string",
      value: city,
    },
    {
      field: "经销商",
      type: "string",
      value: dealer,
    },
    {
      field: "品牌",
      type: "string",
      value: brand,
    },
    {
      field: "车型",
      type: "string",
      value: brandModel,
    },
    {
      field: "销售",
      type: "string",
      value: salesPerson,
    },
    {
      field: "线上询问次数",
      type: "number",
      value: random.number(0, 20),
    },
    {
      field: "到店访客数",
      type: "number",
      value: random.number(0, 12),
    },
    {
      field: "订单数量",
      type: "number",
      value: random.number(0, 3),
    },
    {
      field: "交付数量",
      type: "number",
      value: random.number(0, 2),
    },
    {
      field: "订单金额",
      type: "number",
      value: modelSalePrice,
    },
  ],
  1000
);

export const example = createDataSet(
  "example",
  "Example",
  [
    {
      field: "age",
      type: "number",
      value: random.number(5, 90),
    },
    {
      field: "city",
      type: "string",
      value: random.label([
        { label: "Melbourne", weight: 2 },
        { label: "Sydney", weight: 1 },
      ]),
    },
  ],
  100
);
