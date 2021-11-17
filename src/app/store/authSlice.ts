import { createSlice } from "@reduxjs/toolkit";
import { fetched } from "./fetchAll";

export type UserInfo = {
  displayName: string;
  email: string;
  photoURL?: string;
};

export type AuthState = {
  loaded: boolean;
  userInfo: UserInfo | null;
};

export const initialState: AuthState = {
  loaded: false,
  userInfo: null,
};

const { actions, reducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetched, (state, action) => {
      state.loaded = true;
      state.userInfo = action.payload.userInfo;
    });
  },
});

export { actions, reducer };
