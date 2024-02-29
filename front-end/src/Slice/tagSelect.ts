import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface tag {
  tagName: string;
  color: string;
}

const initialState: { value: tag[] } = {
  value: [],
};

export const tagSelectSlice = createSlice({
  name: "tagSelect",
  initialState,

  reducers: {
    get: (state, action: PayloadAction<tag[]>) => {
      state.value = [...action.payload];
    },
  },
});

export const selectTagList = (state: RootState) => state.tagSelect;
export default tagSelectSlice;
