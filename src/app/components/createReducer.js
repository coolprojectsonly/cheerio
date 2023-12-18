import { createSlice } from "@reduxjs/toolkit";
import { getIcon } from "./action";

const initialState = {
  status: "idle",
  error: null,
  data: [],
};
const createReducer = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIcon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getIcon.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })

      .addCase(getIcon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default createReducer;
