import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Today {
  year: string;
  month: string;
  day: string;
}
interface TodayValue {
  value: Today;
}

const getInitialDate = (): Today => {
  const date = new Date();
  return {
    year: String(date.getFullYear()),
    month: String(date.getMonth() + 1),
    day: String(date.getDate()),
  };
};

const initialState: TodayValue = {
  value: getInitialDate(),
};

export const TodaySlice = createSlice({
  name: "TodaySlice",
  initialState,

  reducers: {
    year: (state, action: PayloadAction<string>) => {
      state.value.year = action.payload;
    },
    month: (state, action: PayloadAction<string>) => {
      state.value.month = action.payload;
    },
    day: (state, action: PayloadAction<string>) => {
      state.value.day = action.payload;
    },
  },
});

export const selectTodayDate = (state: RootState) => state.Today.value;
export default TodaySlice;
