import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PickDate {
  year: string;
  month: string;
  day: string;
}
interface PickData {
  name: string;
  startDate: PickDate;
  endDate: PickDate;
  startTime: string;
  endTime: string;
  tagColor: string;
  tagName: string;
}

const initialState: { value: PickData } = {
  value: {
    name: "",
    startDate: { year: "", month: "", day: "" },
    endDate: { year: "", month: "", day: "" },
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
    startDate: (state, action: PayloadAction<PickDate>) => {
      state.value.startDate = action.payload;
    },
    endDate: (state, action: PayloadAction<PickDate>) => {
      state.value.endDate = action.payload;
    },
    name: (state, action: PayloadAction<string>) => {
      state.value.name = action.payload;
    },
    startTime: (state, action: PayloadAction<string>) => {
      state.value.startTime = action.payload;
    },
    endTime: (state, action: PayloadAction<string>) => {
      state.value.endTime = action.payload;
    },
    tagColor: (state, action: PayloadAction<string>) => {
      state.value.tagColor = action.payload;
    },
    tagName: (state, action: PayloadAction<string>) => {
      state.value.tagName = action.payload;
    },
    reset: (state) => {
      state.value = initialState.value;
    },
  },
});

export const selectPickDate = (state: RootState) => state.PickDate.value;
export const { reset } = PickDateSlice.actions;
export default PickDateSlice;
