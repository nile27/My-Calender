import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: { value: boolean } = {
  value: false,
};

export const isUpdateSlice = createSlice({
  name: "isUpdate",
  initialState,

  reducers: {
    isUpdate: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const isUpdate = (state: RootState) => state.isUpdate.value;
export default isUpdateSlice;
