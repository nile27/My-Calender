import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TODOOBJArr } from "../type";
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
  },
});

export const selectTodo = (state: RootState) => state.Todo.value;
export default TodoSlice;
