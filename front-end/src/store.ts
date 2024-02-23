import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./Slice/todoSlice";
import TodaySlice from "./Slice/todayDate";
import PickDateSlice from "./Slice/pickDateSlice";

const store = configureStore({
  reducer: {
    Todo: TodoSlice.reducer,
    Today: TodaySlice.reducer,
    PickDate: PickDateSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
