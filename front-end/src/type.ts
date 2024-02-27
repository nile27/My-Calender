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
  name: string;
  tagName: string;
  color: string;
  startTime: string;
  endTime: string;
  done: boolean;
}
export interface MonthTodo {
  color: string[];
  name: string[];
  date: string;
  time: string;
  tagname: string[];
  year: string;
  month: string;
  end: string;
  day: string;
}

export interface TODOdata {
  [key: string]: TODOOBJArr;
}

export interface SearchData {
  [key: string]: string;
}
