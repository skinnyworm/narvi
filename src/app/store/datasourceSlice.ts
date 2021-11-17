import { createSlice } from "@reduxjs/toolkit";
import { DataSource } from "app/types";
import { fetched } from "./fetchAll";

export type DatasourceState = {
  allDatasources: DataSource[];
};

export const initialState: DatasourceState = {
  allDatasources: [],
};

export const { reducer } = createSlice({
  name: "datasources",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetched, (state, action) => {
      state.allDatasources = action.payload.datasources;
    });
  },
});
