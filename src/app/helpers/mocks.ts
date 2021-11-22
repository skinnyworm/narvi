import { RootState } from 'app/store';
import { autoSales, example } from './dataset';

export const initialState: RootState = {
  datasource: {
    allDatasources: [autoSales, example],
  },
  dashboard: {
    widgets: [],
  },
  auth: {
    loaded: true,
    userInfo: {
      displayName: '章叁',
      email: 'user@example.com',
    },
  },
};
