import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PickData {
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  tagColor: string;
  tagName: string;
}
// const date = new Date();

const initialState: { value: PickData } = {
  value: {
    name: "",
    startDate: null,
    endDate: null,
    startTime: "",
    endTime: "",
    tagColor: "",
    tagName: "",
  },
};

export const PickDateSlice = createSlice({
  name: "pickDateSlice",
  initialState,

  reducers: {
    startDate: (state, action: PayloadAction<Date | null>) => {
      state.value.startDate = action.payload;
    },
    endDate: (state, action: PayloadAction<Date | null>) => {
      state.value.endDate = action.payload;
    },
    name: (state, action: PayloadAction<string>) => {
      state.value.name = action.payload;
    },
    startTime: (state, action: PayloadAction<string>) => {
      state.value.startTime = action.payload;
    },
    endTime: (state, action: PayloadAction<string>) => {
      state.value.startTime = action.payload;
    },
    tagColor: (state, action: PayloadAction<string>) => {
      state.value.tagColor = action.payload;
    },
    tagName: (state, action: PayloadAction<string>) => {
      state.value.tagColor = action.payload;
    },
  },
});

export const selectPickDate = (state: RootState) => state.PickDate.value;
export default PickDateSlice;
