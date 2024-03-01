import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TODOOBJArr } from "../type";

interface tag {
  tagName: string;
  color: string;
}

interface tagFilter {
  value: tag[];
  visit: boolean[];
}

const initialState: tagFilter = {
  value: [],
  visit: [],
};

export const tagFilterSlice = createSlice({
  name: "tagFilterSlice",
  initialState,

  reducers: {
    add: (state, action: PayloadAction<tag>) => {
      const idx: number = state.value.findIndex(
        (el) =>
          el.tagName === action.payload.tagName &&
          el.color === action.payload.color
      );
      if (idx === -1) {
        state.value = [...state.value, action.payload];
      }
    },

    get: (state, action: PayloadAction<tag[]>) => {
      const filterArr: tag[] = [];
      action.payload.forEach((item: tag) => {
        if (item.tagName && item.color) {
          const key = `${item.tagName}-${item.color}`;

          const existingIndex = filterArr.findIndex((el) => {
            return `${el.tagName}-${el.color}` === key;
          });

          if (existingIndex === -1) {
            filterArr.push({ tagName: item.tagName, color: item.color });
          }
        }
      });
      state.value = [...filterArr];
      state.visit = Array.from({ length: filterArr.length }, () => false);
    },
    patch: (state, action: PayloadAction<TODOOBJArr[]>) => {
      const arr: tag[] = [];
      action.payload.forEach((item) => {
        const idx = arr.findIndex(
          (el) => el.tagName === item.tagName && el.color === item.color
        );

        if (idx === -1 && item.tagName && item.color !== "null") {
          arr.push({ tagName: item.tagName, color: item.color });
        }
      });
      state.value = [...arr];
    },
    check: (state, action: PayloadAction<number>) => {
      state.visit[action.payload] = true;
    },
    uncheck: (state, action: PayloadAction<number>) => {
      state.visit[action.payload] = false;
    },
  },
});

export const selectTagDate = (state: RootState) => state.tagFilter;
export default tagFilterSlice;
