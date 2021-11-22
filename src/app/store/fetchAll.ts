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
  const exampleWidget: Widget = {
    id: 'example',
    title: '2021车型销量',
    datasource: autoSales.id,
    label: '$车型',
    output: [
      {
        name: '销量',
        expression: 'sum($交付数量)',
      },
    ],
    charts: [
      {
        type: 'simple',
        title: '销量图表',
        size: 'medium',
        category: '车型',
        series: [{ name: '销量', type: 'bar' }],
      },
    ],
  };

  store.dispatch(
    fetched({
      datasources: [autoSales, example],
      widgets: [exampleWidget],
      userInfo: {
        displayName: '章叁',
        email: 'user@example.com',
      },
    }),
  );
};
