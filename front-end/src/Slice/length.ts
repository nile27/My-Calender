import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: { value: number } = {
  value: 0,
};

export const lengthSlice = createSlice({
  name: "length",
  initialState,

  reducers: {
    monthUpdate: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const selectLength = (state: RootState) => state.Month.value;
export default lengthSlice;
