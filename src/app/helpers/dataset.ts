import { Value } from 'app/types';
import { createDataSet } from './createDataSet';
import * as random from './random';
import range from 'lodash/range';

const brand = random.label([
  {
    label: '大众',
    weight: 2,
  },
  {
    label: '领克',
    weight: 0.3,
  },
  {
    label: '长城',
    weight: 1.5,
  },
  {
    label: '通用',
    weight: 0.7,
  },
]);

const brandModel = (prev: Value[]) => {
  // 品牌
  switch (prev[3]) {
    case '大众':
      return random.label([
        {
          label: '新帕萨特',
          weight: 2,
        },
      ])();

    case '领克':
      return random.label([
        {
          label: '领克03',
          weight: 2,
        },
        {
          label: '领克01',
          weight: 1,
        },
      ])();

    case '长城':
      return random.label([
        {
          label: '哈弗H6',
          weight: 1,
        },
      ])();

    case '通用':
      return random.label([
        {
          label: '君威',
          weight: 1,
        },
      ])();

    default:
      return '未知车型';
  }
};

const modelSalePrice = (prev: Value[]) => {
  //"车型"
  switch (prev[4]) {
    case '新帕萨特':
      return random.number(180000, 220000)();
    case '领克03':
      return random.number(120000, 180000)();
    case '领克01':
      return random.number(130000, 160000)();
    case '哈弗H6':
      return random.number(80000, 110000)();
    case '君威':
      return random.number(110000, 170000)();
    default:
      return 100000;
  }
};

const salesPerson = random.label([
  {
    label: '章霰',
    weight: 0.5,
  },
  {
    label: '黎思',
    weight: 1,
  },
  {
    label: '旺武',
    weight: 2,
  },
  {
    label: '邹柳',
    weight: 1.4,
  },
]);

const dealer = random.label([
  {
    label: '永达集团',
    weight: 2,
  },
  {
    label: '浙江物产元通',
    weight: 2,
  },
  {
    label: '广汇汽车',
    weight: 0.4,
  },
  {
    label: '中升集团',
    weight: 0.7,
  },
]);

const city = random.label([
  {
    label: '上海',
    weight: 2.3,
  },
  {
    label: '北京',
    weight: 2,
  },
  {
    label: '合肥',
    weight: 0.4,
  },
  {
    label: '武汉',
    weight: 0.7,
  },
  {
    label: '海门',
    weight: 0.3,
  },
  {
    label: '鄂尔多斯',
    weight: 0.2,
  },
  {
    label: '舟山',
    weight: 0.1,
  },
  {
    label: '齐齐哈尔',
    weight: 0.3,
  },
  {
    label: '盐城',
    weight: 0.2,
  },
  {
    label: '泉州',
    weight: 0.3,
  },
  {
    label: '日照',
    weight: 0.2,
  },
  {
    label: '南通',
    weight: 0.3,
  },
  {
    label: '拉萨',
    weight: 0.2,
  },
  {
    label: '文登',
    weight: 0.3,
  },

  {
    label: '威海',
    weight: 0.3,
  },
  {
    label: '承德',
    weight: 0.3,
  },
  {
    label: '厦门',
    weight: 0.5,
  },
  {
    label: '太仓',
    weight: 0.3,
  },
  {
    label: '烟台',
    weight: 0.3,
  },
  {
    label: '福州',
    weight: 0.3,
  },
  {
    label: '昆山',
    weight: 0.6,
  },
  {
    label: '宁波',
    weight: 0.3,
  },
  {
    label: '湛江',
    weight: 0.3,
  },
  {
    label: '连云港',
    weight: 0.3,
  },
  {
    label: '葫芦岛',
    weight: 0.1,
  },
  {
    label: '常熟',
    weight: 0.3,
  },
  {
    label: '东莞',
    weight: 0.3,
  },
  {
    label: '江阴',
    weight: 0.3,
  },
  {
    label: '蓬莱',
    weight: 0.3,
  },
  {
    label: '韶关',
    weight: 0.2,
  },
  {
    label: '嘉峪关',
    weight: 0.1,
  },
  {
    label: '广州',
    weight: 0.8,
  },
  {
    label: '延安',
    weight: 0.3,
  },
  {
    label: '太原',
    weight: 0.3,
  },
  {
    label: '清远',
    weight: 0.3,
  },
  {
    label: '寿光',
    weight: 0.3,
  },
  {
    label: '盘锦',
    weight: 0.3,
  },
  {
    label: '长治',
    weight: 0.3,
  },
  {
    label: '深圳',
    weight: 0.7,
  },
  {
    label: '珠海',
    weight: 0.6,
  },
  {
    label: '佛山',
    weight: 0.4,
  },
  {
    label: '海口',
    weight: 0.3,
  },
  {
    label: '江门',
    weight: 0.3,
  },
  {
    label: '大连',
    weight: 0.4,
  },
  {
    label: '临汾',
    weight: 0.1,
  },
  {
    label: '吴江',
    weight: 0.3,
  },
  {
    label: '石嘴山',
    weight: 0.1,
  },
  {
    label: '沈阳',
    weight: 0.3,
  },
  {
    label: '苏州',
    weight: 0.6,
  },
  {
    label: '茂名',
    weight: 0.3,
  },
  {
    label: '嘉兴',
    weight: 0.3,
  },
  {
    label: '长春',
    weight: 0.3,
  },
  {
    label: '胶州',
    weight: 0.3,
  },
  {
    label: '银川',
    weight: 0.3,
  },
  {
    label: '张家港',
    weight: 0.3,
  },
  {
    label: '锦州',
    weight: 0.3,
  },
  {
    label: '三亚',
    weight: 0.3,
  },
  {
    label: '泸州',
    weight: 0.3,
  },
  {
    label: '西宁',
    weight: 0.3,
  },
  {
    label: '呼和浩特',
    weight: 0.3,
  },
  {
    label: '成都',
    weight: 0.3,
  },
  {
    label: '大同',
    weight: 0.3,
  },
  {
    label: '镇江',
    weight: 0.3,
  },
  {
    label: '桂林',
    weight: 0.2,
  },
  {
    label: '张家界',
    weight: 0.1,
  },
  {
    label: '宜兴',
    weight: 0.3,
  },
  {
    label: '西安',
    weight: 0.3,
  },
  {
    label: '牡丹江',
    weight: 0.3,
  },
  {
    label: '遵义',
    weight: 0.3,
  },
  {
    label: '绍兴',
    weight: 0.3,
  },
  {
    label: '扬州',
    weight: 0.3,
  },
  {
    label: '常州',
    weight: 0.3,
  },

  {
    label: '重庆',
    weight: 0.5,
  },
  {
    label: '台州',
    weight: 0.3,
  },
  {
    label: '南京',
    weight: 0.4,
  },

  {
    label: '贵阳',
    weight: 0.3,
  },
  {
    label: '无锡',
    weight: 0.3,
  },
  {
    label: '徐州',
    weight: 0.3,
  },

  {
    label: '包头',
    weight: 0.3,
  },

  {
    label: '乌鲁木齐',
    weight: 0.5,
  },

  {
    label: '杭州',
    weight: 0.7,
  },

  {
    label: '溧阳',
    weight: 0.3,
  },
  {
    label: '安阳',
    weight: 0.3,
  },
  {
    label: '开封',
    weight: 0.3,
  },
  {
    label: '济南',
    weight: 0.3,
  },

  {
    label: '温州',
    weight: 0.3,
  },

  {
    label: '邯郸',
    weight: 0.3,
  },
  {
    label: '临安',
    weight: 0.3,
  },
  {
    label: '兰州',
    weight: 0.3,
  },

  {
    label: '南充',
    weight: 0.3,
  },
  {
    label: '天津',
    weight: 0.3,
  },
  {
    label: '富阳',
    weight: 0.3,
  },
  {
    label: '泰安',
    weight: 0.3,
  },
  {
    label: '诸暨',
    weight: 0.3,
  },
  {
    label: '郑州',
    weight: 0.3,
  },
  {
    label: '哈尔滨',
    weight: 0.3,
  },

  {
    label: '唐山',
    weight: 0.3,
  },
  {
    label: '平顶山',
    weight: 0.3,
  },

  {
    label: '德州',
    weight: 0.3,
  },
  {
    label: '济宁',
    weight: 0.3,
  },
  {
    label: '荆州',
    weight: 0.3,
  },
  {
    label: '宜昌',
    weight: 0.3,
  },
  {
    label: '义乌',
    weight: 0.3,
  },
  {
    label: '丽水',
    weight: 0.3,
  },
  {
    label: '洛阳',
    weight: 0.3,
  },
  {
    label: '秦皇岛',
    weight: 0.3,
  },
  {
    label: '株洲',
    weight: 0.3,
  },
  {
    label: '石家庄',
    weight: 0.3,
  },
  {
    label: '常德',
    weight: 0.3,
  },
  {
    label: '保定',
    weight: 0.3,
  },

  {
    label: '长沙',
    weight: 0.3,
  },

  {
    label: '大庆',
    weight: 0.3,
  },
]);

export const staffKpi = createDataSet(
  'staffKpi',
  '销售顾问能力模型',
  [
    {
      field: '日期',
      type: 'string',
      value: random.label(
        range(1, 13).map<random.WeightedLabel>((i) => ({
          label: `2020年${i}月`,
          weight: 1 - (i % 3) / 5,
        })),
      ),
    },
    {
      field: '销售顾问',
      type: 'string',
      value: salesPerson,
    },
    {
      field: '城市',
      type: 'string',
      value: city,
    },
    {
      field: '经销商',
      type: 'string',
      value: dealer,
    },
    {
      field: '电话联系人数',
      type: 'number',
      value: random.number(0, 200),
    },
    {
      field: '加微人数',
      type: 'number',
      value: random.number(0, 170),
    },
    {
      field: '到店人数',
      type: 'number',
      value: random.number(0, 90),
    },
    {
      field: '再次到店人数',
      type: 'number',
      value: random.number(0, 50),
    },
    {
      field: '完整客户档案数',
      type: 'number',
      value: random.number(0, 10),
    },
    {
      field: '试驾人数',
      type: 'number',
      value: random.number(0, 30),
    },
    {
      field: '订单数量',
      type: 'number',
      value: random.number(0, 26),
    },
    {
      field: '交付数量',
      type: 'number',
      value: random.number(0, 20),
    },
    {
      field: '订单金额',
      type: 'number',
      value: random.number(180000, 220000),
    },
  ],
  1000,
);

export const autoSales = createDataSet(
  'autoSales',
  '销售数据',
  [
    {
      field: '日期',
      type: 'string',
      value: random.label(
        range(1, 13).map<random.WeightedLabel>((i) => ({
          label: `2020年${i}月`,
          weight: 1 - (i % 3) / 10,
        })),
      ),
    },
    {
      field: '城市',
      type: 'string',
      value: city,
    },
    {
      field: '经销商',
      type: 'string',
      value: dealer,
    },
    {
      field: '品牌',
      type: 'string',
      value: brand,
    },
    {
      field: '车型',
      type: 'string',
      value: brandModel,
    },

    {
      field: '线上询问次数',
      type: 'number',
      value: random.number(0, 20),
    },
    {
      field: '到店访客数',
      type: 'number',
      value: random.number(0, 12),
    },
    {
      field: '订单数量',
      type: 'number',
      value: random.number(0, 3),
    },
    {
      field: '交付数量',
      type: 'number',
      value: random.number(0, 2),
    },
    {
      field: '订单金额',
      type: 'number',
      value: modelSalePrice,
    },
  ],
  1000,
);

export const example = createDataSet(
  'example',
  '示例数据',
  [
    {
      field: 'age',
      type: 'number',
      value: random.number(5, 90),
    },
    {
      field: 'city',
      type: 'string',
      value: random.label([
        { label: 'Melbourne', weight: 2 },
        { label: 'Sydney', weight: 1 },
      ]),
    },
  ],
  100,
);
