import { createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  loaded: boolean;
  userInfo: {
    displayName: string;
    email: string;
    photoURL?: string;
  };
};

export const initialState: AuthState = {
  loaded: true,
  userInfo: {
    displayName: "章叁",
    email: "user@example.com",
  },
};

const { actions, reducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export { actions, reducer };
