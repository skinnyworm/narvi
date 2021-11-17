import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer as auth } from "./authSlice";
import { reducer as dashboard } from "./dashboardSlice";
import { reducer as datasource } from "./datasourceSlice";

export const store = configureStore({
  reducer: {
    auth,
    dashboard,
    datasource,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
