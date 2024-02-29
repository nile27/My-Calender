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
      state.value = [...filterArr]; // 상태 값 업데이트
      state.visit = Array.from({ length: filterArr.length }, () => false); // visit 배열 초기화
    },
    patch: (state, action: PayloadAction<TODOOBJArr[]>) => {
      // const newState: tag[] = state.value.map((oldItem) => {
      //   const newItem = action.payload.findIndex(
      //     (item) =>
      //       item.tagName === oldItem.tagName && item.color === oldItem.color
      //   );
      //   return newItem === -1
      //     ? {
      //         tagName: oldItem.tagName,
      //         color: oldItem.color,
      //       }
      //     : {
      //         tagName: action.payload[newItem].tagName,
      //         color: action.payload[newItem].color,
      //       };
      // });
      const arr: tag[] = [];
      action.payload.forEach((item) => {
        const idx = arr.findIndex(
          (el) => el.tagName === item.tagName && el.color === item.color
        );
        if (idx === -1) {
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
