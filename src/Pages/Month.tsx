import styled from "styled-components";

import Day from "../Components/Month-day";
import { ReactComponent as Arrow } from "../Img/ep_arrow-right-bold.svg";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MonthBox = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .timeBox {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0;
      span {
        font-size: var(--header-size);
        font-weight: 600;
        min-width: 120px;
        text-align: center;
      }
    }
  }
`;

const ArrowBtn = styled.button`
  display: flex;
  justify-content: center;

  &:hover {
    path {
      fill: var(--skyblue);
    }
  }
`;

const DaysBox = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
`;

const DayWeekBox = styled.ul`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 10%;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: var(--whiteblue);

    span {
      font-weight: 600;
      font-size: 18px;
    }
  }
`;

const WeekBox = styled.ul`
  width: 100%;
  flex-grow: 1;
  display: flex;
`;

const Arrowimg = styled(Arrow)`
  width: 100%;
  height: 100%;
`;

const ReverseArrow = styled(Arrowimg)`
  transform: scaleX(-1);
`;

export default function Month() {
  const monthList = (nowDate: Date, count: number) => {
    const nowYear =
      nowDate.getFullYear() + Math.floor((nowDate.getMonth() + count) / 12);
    let nowMonth: number = 0;

    if (nowDate.getMonth() + (count % 12) + 1 > 12) {
      nowMonth = nowDate.getMonth() + (count % 12) - 12;
    } else if (nowDate.getMonth() + (count % 12) + 1 <= 0) {
      nowMonth = nowDate.getMonth() + (count % 12) + 12;
    } else {
      nowMonth = nowDate.getMonth() + (count % 12);
    }

    const dayOneWeek = new Date(nowYear, nowMonth, 1).getDay();

    let weekArr: number[] = [];
    const result: [number[]] = [[]];
    const dayArr: number[] = [];
    result.pop();

    const nowMonthEnd = new Date(nowYear, nowMonth + 1, 0).getDate();
    const prevMonthEnd = new Date(nowYear, nowMonth, 0).getDate();

    for (let i = dayOneWeek - 1; i >= 0; i--) {
      dayArr.push(new Date(nowYear, nowMonth - 1, prevMonthEnd - i).getDay());
      weekArr.push(0);
    }

    for (let i = 1; i <= nowMonthEnd; i++) {
      dayArr.push(new Date(nowYear, nowMonth, i).getDay());
      weekArr.push(new Date(nowYear, nowMonth, i).getDate());

      if (weekArr.length === 7) {
        result.push(weekArr);
        weekArr = [];
      }
    }

    if (weekArr.length) {
      while (weekArr.length < 7) {
        weekArr.push(0);
      }
      result.push(weekArr);
    }

    return { result, dayArr, nowMonth, nowYear };
  };

  const date = new Date();
  const [dateCount, setDateCount] = useState<number>(0);
  const { result, nowMonth, nowYear, dayArr } = monthList(date, dateCount);
  const allDay: [number[]] = result;
  const dayWeek: string[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const monthArr: string[] = [
    "Jaunary",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Container>
      <MonthBox>
        <div>
          <ArrowBtn onClick={() => setDateCount(dateCount - 1)}>
            <Arrowimg />
          </ArrowBtn>
          <div className="timeBox">
            <span>{nowYear}</span>
            <span>{monthArr[nowMonth]}</span>
          </div>

          <ArrowBtn onClick={() => setDateCount(dateCount + 1)}>
            <ReverseArrow />
          </ArrowBtn>
        </div>
      </MonthBox>

      <DaysBox>
        <DayWeekBox>
          {dayWeek.map((item: string, key: number) => {
            return (
              <li key={key}>
                <span>{item}</span>
              </li>
            );
          })}
        </DayWeekBox>
        {allDay.map((item: number[], idx: number) => {
          return (
            <WeekBox key={idx}>
              {item.map((day: number, key: number) => {
                return (
                  <Day
                    day={day}
                    getday={dayArr[key]}
                    date={date}
                    nowYear={nowYear}
                    month={nowMonth + 1}
                    key={key}
                  ></Day>
                );
              })}
            </WeekBox>
          );
        })}
      </DaysBox>
    </Container>
  );
}
