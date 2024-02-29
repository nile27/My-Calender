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
      const patchDataIndex = state.value.findIndex(
        (el) => el._id === action.payload._id
      );
      if (patchDataIndex !== -1) {
        state.value[patchDataIndex] = {
          ...state.value[patchDataIndex],
          name: action.payload.name,
          tagName: action.payload.tagName,
          color: action.payload.color,
          startTime: action.payload.startTime,
          endTime: action.payload.endTime,
        };
      }
    },
    postUpdate: (state, action: PayloadAction<TODOOBJArr>) => {
      state.value = [
        ...state.value,
        {
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
        },
      ];
    },
    deleteUpdate: (state, action: PayloadAction<string>) => {
      const deleteData: number = state.value.findIndex(
        (el) => el._id === action.payload
      );
      state.value.splice(deleteData, 1);
    },
  },
});

export const selectTodo = (state: RootState) => state.Todo.value;
export default TodoSlice;
