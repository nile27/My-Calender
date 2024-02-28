import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TODOOBJArr, PickData } from "../type";
import { RootState } from "../store";

const initialState: { value: TODOOBJArr[] } = {
  value: [],
};

export const TodoSlice = createSlice({
  name: "todoSlice",
  initialState,

  reducers: {
    update: (state, action: PayloadAction<TODOOBJArr[]>) => {
      state.value = action.payload;
    },
    done: (state, action: PayloadAction<number>) => {
      state.value[action.payload].done = !state.value[action.payload].done;
    },
    patchUpdate: (state, action: PayloadAction<PickData>) => {
      const patchData = state.value.findIndex(
        (el) => el._id === action.payload._id
      );
      state.value[patchData].name = action.payload.name;
      state.value[patchData].tagName = action.payload.tagName;
      state.value[patchData].color = action.payload.color;
      state.value[patchData].startTime = action.payload.startTime;
      state.value[patchData].endTime = action.payload.endTime;
    },
    postUpdate: (state, action: PayloadAction<TODOOBJArr>) => {
      state.value.push({
        _id: action.payload._id,
        name: action.payload.name,
        month: action.payload.month,
        year: action.payload.year,
        day: action.payload.day,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        color: action.payload.color,
        tagName: action.payload.tagName,
        done: false,
      });
    },
  },
});

export const selectTodo = (state: RootState) => state.Todo.value;
export default TodoSlice;
