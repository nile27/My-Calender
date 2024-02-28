import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PickData, PickYear } from "../type";
import { RootState } from "../store";

const initialState: { value: PickData } = {
  value: {
    _id: "",
    name: "",
    startDate: { year: "", month: "", day: "" },
    endDate: { year: "", month: "", day: "" },
    startTime: 0,
    endTime: 0,
    color: "null",
    tagName: "",
    done: false,
  },
};

export const PickDateSlice = createSlice({
  name: "pickDateSlice",
  initialState,
  reducers: {
    id: (state, action: PayloadAction<string>) => {
      state.value._id = action.payload;
    },
    startDate: (state, action: PayloadAction<PickYear>) => {
      state.value.startDate = action.payload;
    },
    endDate: (state, action: PayloadAction<PickYear>) => {
      state.value.endDate = action.payload;
    },
    name: (state, action: PayloadAction<string>) => {
      state.value.name = action.payload;
    },
    startTime: (state, action: PayloadAction<number>) => {
      state.value.startTime = action.payload;
    },
    endTime: (state, action: PayloadAction<number>) => {
      state.value.endTime = action.payload;
    },
    tagColor: (state, action: PayloadAction<string>) => {
      state.value.color = action.payload;
    },
    tagName: (state, action: PayloadAction<string>) => {
      state.value.tagName = action.payload;
    },
    reset: (state) => {
      state.value = initialState.value;
    },
    dateReset: (state) => {
      state.value = {
        ...initialState.value,
        startDate: state.value.startDate,
        endDate: state.value.endDate,
      };
    },
  },
});

export const selectPickDate = (state: RootState) => state.PickDate.value;
export const { reset } = PickDateSlice.actions;
export default PickDateSlice;
