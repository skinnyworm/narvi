import { createSlice } from "@reduxjs/toolkit";
import { Widget } from "app/types";

import { fetched } from "./fetchAll";

export interface DashboardState {
  widgets: Widget[];
}

export const initialState: DashboardState = {
  widgets: [],
};

export const { reducer } = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetched, (state, action) => {
      state.widgets = action.payload.widgets;
    });
  },
});
