import styled from "styled-components";
import Day from "../Components/Month-day";
import { Holiday, DataHoliday } from "../type";

const WeekBox = styled.ul`
  width: 100%;
  flex: 1 1 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

interface Prop {
  holidata: Holiday[] | undefined;
  date: Date;
}

export default function Week(props: Prop) {
  const { holidata, date } = props;

  const isHoliday: string[] = holidata
    ? holidata.map((item: Holiday) => String(item.locdate))
    : [];
  const holiday: DataHoliday[] = holidata
    ? holidata.map((item: Holiday) => {
        return { dateName: item.dateName, isHoliday: item.isHoliday };
      })
    : [];
  const monthList = (nowDate: Date) => {
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth();

    const dayOneWeek = new Date(nowYear, nowMonth, 1).getDay();
    const dayLastWeek = new Date(nowYear, nowMonth + 1, 0).getDay();

    const result: number[] = [];
    const dayArr: number[] = [];

    const nowMonthEnd = new Date(nowYear, nowMonth + 1, 0).getDate();
    const prevMonthEnd = new Date(nowYear, nowMonth, 0).getDate();

    for (let i = dayOneWeek - 1; i >= 0; i--) {
      dayArr.push(new Date(nowYear, nowMonth - 1, prevMonthEnd - i).getDay());
      result.push(0);
    }

    for (let i = 1; i <= nowMonthEnd; i++) {
      dayArr.push(new Date(nowYear, nowMonth, i).getDay());
      result.push(new Date(nowYear, nowMonth, i).getDate());
    }
    for (let i = 1; i < 7 - dayLastWeek; i++) {
      dayArr.push(new Date(nowYear, nowMonth + 1, i).getDay());
      result.push(0);
    }

    return { result, dayArr, nowMonth, nowYear };
  };

  const { result, nowMonth, nowYear, dayArr } = monthList(date);
  const allDay: number[] = result;

  return (
    <>
      <WeekBox>
        {allDay.map((day: number, key: number) => {
          const strMonth =
            String(nowMonth + 1).length < 2
              ? `0` + `${nowMonth + 1}`
              : `${nowMonth + 1}`;
          const strDay = String(day).length < 2 ? `0` + `${day}` : `${day}`;

          const idx: number = isHoliday.indexOf(
            `${nowYear}` + `${strMonth}` + `${strDay}`,
          );

          return (
            <Day
              day={day}
              getday={dayArr[key]}
              nowYear={nowYear}
              month={nowMonth + 1}
              key={key}
              holiday={holiday[idx]}
            ></Day>
          );
        })}
      </WeekBox>
    </>
  );
}
