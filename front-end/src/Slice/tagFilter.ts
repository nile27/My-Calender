import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface tag {
  tagName: string;
  color: string;
}

interface tagFilter {
  value: tag[];
  visit: boolean[];
}

const initialState: tagFilter = {
  value: [],
  visit: [],
};

export const tagFilterSlice = createSlice({
  name: "tagFilterSlice",
  initialState,

  reducers: {
    add: (state, action: PayloadAction<tag>) => {
      state.value.push(action.payload);
    },
    get: (state, action: PayloadAction<tag[]>) => {
      state.value = [...action.payload];
      state.visit = Array.from({ length: state.value.length }, () => false);
    },
    check: (state, action: PayloadAction<number>) => {
      state.visit[action.payload] = true;
    },
    uncheck: (state, action: PayloadAction<number>) => {
      state.visit[action.payload] = false;
    },
  },
});

export const selectTagDate = (state: RootState) => state.tagFilter;
export default tagFilterSlice;
