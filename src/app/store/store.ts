import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import { reducer as auth } from "./authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth,
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
