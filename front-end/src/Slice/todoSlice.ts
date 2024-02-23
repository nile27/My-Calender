import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TODOdata } from "../type";
import { RootState } from "../store";

export const TodoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    value: {},
  },

  reducers: {
    update: (state, action: PayloadAction<TODOdata>) => {
      state.value = action.payload;
    },
  },
});

export const selectTodo = (state: RootState) => state.Todo.value;
export default TodoSlice;
