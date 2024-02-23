import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./Slice/todoSlice";
import TodaySlice from "./Slice/todayDate";
import PickDateSlice from "./Slice/pickDateSlice";
import MonthSlice from "./Slice/monthSlice";

const store = configureStore({
  reducer: {
    Todo: TodoSlice.reducer,
    Today: TodaySlice.reducer,
    PickDate: PickDateSlice.reducer,
    Month: MonthSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
