import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
    // 1. add 리듀서 함수 수정: 조건문에서 상태를 변경하는 대신 새로운 상태를 반환하도록 수정
    add: (state, action: PayloadAction<tag>) => {
      const idx: number = state.value.findIndex(
        (el) =>
          el.tagName === action.payload.tagName &&
          el.color === action.payload.color
      );
      if (idx === -1) {
        // 태그가 이미 존재하지 않을 때만 추가
        state.value = [...state.value, action.payload]; // 기존 상태 변경 대신 새로운 상태 반환
      }
    },

    // 2. get 리듀서 함수 수정: visit 배열을 초기화할 때 state.value의 길이가 아니라 filterArr의 길이를 기준으로 visit 배열을 생성하도록 수정
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
