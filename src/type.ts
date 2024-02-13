export type DataHoliday = {
  dateName: string;
  isHoliday: string;
};

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
  background: string;
}

export interface TODOOBJArr {
  name: string;
  tag: string;
  color: string;
  time: string;
  done: boolean;
}

export interface TODOdata {
  [key: string]: TODOOBJArr;
}
