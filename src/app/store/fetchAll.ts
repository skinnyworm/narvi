import { Store, createAction } from '@reduxjs/toolkit';
import { DataSource, Widget } from 'app/types';
import { autoSales, example } from 'app/helpers/dataset';
import { RootState } from './store';
import { UserInfo } from './authSlice';

export const fetched = createAction<{
  datasources: DataSource[];
  widgets: Widget[];
  userInfo: UserInfo;
}>('fetched');

export const fetchAll = (store: Store<RootState>) => {
  const salesByModel: Widget = {
    id: 'sales',
    title: '2021车型销量',
    datasource: autoSales.id,
    label: '$车型',
    output: [
      {
        name: '订单量',
        expression: 'sum($订单数量)',
      },
      {
        name: '销量',
        expression: 'sum($交付数量)',
      },
      {
        name: '订单完成率',
        expression: 'sum($交付数量)/sum($订单数量)',
      },
      {
        name: '线上转换率',
        expression: 'sum($到店访客数)/sum($线上询问次数)',
      },
      {
        name: '购买决策转换率',
        expression: 'sum($订单数量)/sum($到店访客数)',
      },
    ],
    charts: [
      {
        type: 'simple',
        title: '销量图表',
        size: 'medium',
        category: '车型',
        series: [
          { name: '销量', type: 'bar' },
          { name: '订单量', type: 'line' },
        ],
      },
      {
        type: 'radar',
        title: '完成率指标',
        size: 'medium',
        category: '车型',
        series: [
          { name: '订单完成率' },
          { name: '订单量' },
          { name: '销量' },
          { name: '线上转换率' },
          { name: '购买决策转换率' },
        ],
      },
    ],
  };

  const salesByCity: Widget = {
    id: 'salesByCity',
    title: '区域销量',
    datasource: autoSales.id,
    label: '$城市',
    output: [
      {
        name: '销量',
        expression: 'sum($交付数量)',
      },
    ],
    charts: [
      {
        type: 'bmap',
        title: '城市销量',
        category: 'city',
        series: [{ name: '销量', size: 'scaled' }],
      },
    ],
  };

  store.dispatch(
    fetched({
      datasources: [autoSales, example],
      widgets: [salesByModel, salesByCity],
      userInfo: {
        displayName: '章叁',
        email: 'user@example.com',
      },
    }),
  );
};
