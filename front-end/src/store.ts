import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./Slice/todoSlice";
import TodaySlice from "./Slice/todayDate";
import PickDateSlice from "./Slice/pickDateSlice";
import MonthSlice from "./Slice/monthSlice";
import isUpdate from "./Slice/isUpdate";

const store = configureStore({
  reducer: {
    Todo: TodoSlice.reducer,
    Today: TodaySlice.reducer,
    PickDate: PickDateSlice.reducer,
    Month: MonthSlice.reducer,
    isUpdate: isUpdate.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
