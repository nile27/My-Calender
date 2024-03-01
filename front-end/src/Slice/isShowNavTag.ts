import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: { value: boolean } = {
  value: false,
};

export const isShowNavTag = createSlice({
  name: "isShow",
  initialState,

  reducers: {
    isUpdate: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const isShowTag = (state: RootState) => state.isShow.value;
export default isShowNavTag;
