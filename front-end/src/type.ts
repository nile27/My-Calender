export type DataHoliday = {
  dateName: string;
  isHoliday: string;
};

export interface ParamsDate {
  year: string | undefined;
  month: string | undefined;
  day: string | undefined;
}

export interface Holiday {
  dateKind: string;
  dateName: string;
  isHoliday: string;
  locdate: number;
  seq: number;
}

export interface DayBoxType {
  onClick?: (e: React.MouseEvent) => void;
}

export interface OnClick {
  onClick?: (e: React.MouseEvent) => void;
}

export interface NumberProp {
  color: string;
  background_color: string;
}

export interface TODOOBJArr {
  _id: string;
  name: string;
  tagName: string;
  color: string;
  startTime: number;
  endTime: number;
  done: boolean;
  year: string;
  month: string;
  day: string;
}
export interface MonthTodo {
  color: string[];
  name: string[];
  tagname: string[];
  year: string;
  month: string;
  day: string;
}

export interface TODOdata {
  [key: string]: TODOOBJArr;
}

export interface SearchData {
  [key: string]: string;
}

export interface PickYear {
  year: string;
  month: string;
  day: string;
}
export interface PickData {
  _id: string;
  name: string;
  startDate: PickYear;
  endDate: PickYear;
  startTime: number;
  endTime: number;
  color: string;
  tagName: string;
  done: boolean;
}
