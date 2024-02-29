import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { MonthTodo } from "../type";

const initialState: { value: MonthTodo[] } = {
  value: [],
};

export const MonthSlice = createSlice({
  name: "todoSlice",
  initialState,

  reducers: {
    monthUpdate: (state, action: PayloadAction<MonthTodo[]>) => {
      state.value = [...action.payload];
    },
  },
});

export const selectMonth = (state: RootState) => state.Month.value;
export default MonthSlice;
