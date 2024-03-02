import styled from "styled-components";

import axios, { isAxiosError } from "axios";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { MonthSlice } from "../Slice/monthSlice";

import { Holiday } from "../type";
import Week from "../Components/Month-week";
import MonthHead from "../Components/Month-head";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DaysBox = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
`;
const AnimationDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
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
      font-size: 100%;
      @media screen and (max-width: 300px) {
        font-size: 70%;
      }
    }
  }
`;

export default function Month() {
  const [date, setDate] = useState<Date>(new Date());
  const nextPage = useRef<HTMLDivElement | null>(null);
  const [holidata, setHoliDate] = useState<Holiday[] | undefined>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getHoliday = async () => {
      const url = `${process.env.REACT_APP_HOLIDAY_URL}?ServiceKey=${process.env.REACT_APP_HOLIDAY_KEY}&solYear=${date.getFullYear()}&numOfRows=20`;

      try {
        const response = await axios.get(url);
        const holidataArr = Array.isArray(
          response.data.response.body.items.item
        )
          ? [...response.data.response.body.items.item]
          : [response.data.response.body.items.item];
        if (holidataArr[0] === undefined) holidataArr.pop();
        setHoliDate(holidataArr);

        return response;
      } catch (error) {
        if (isAxiosError(error)) {
          alert("공휴일을 불러오는데 실패하였습니다.");
        }
        throw error;
      }
    };
    const gettodoDate = async () => {
      const url: string = `http://localhost:4000/month/${date.getFullYear()}`;

      const data = await axios.get(url);

      dispatch(MonthSlice.actions.monthUpdate(data.data));
    };

    getHoliday();
    gettodoDate();
  }, [date.getFullYear()]);

  const dayWeek: string[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <Container>
      <MonthHead date={date} setDate={setDate} ref={nextPage} />
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
        <AnimationDiv ref={nextPage}>
          <Week date={date} holidata={holidata} />
        </AnimationDiv>
      </DaysBox>
    </Container>
  );
}
