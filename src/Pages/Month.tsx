import styled from "styled-components";
import axios from "axios";
import Week from "../Components/Month-week";
import MonthHead from "../Components/Month-head";

import { useState, useEffect } from "react";

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

export default function Month() {
  interface Holiday {
    dateKind: string;
    dateName: string;
    isHoliday: string;
    locdate: number;
    seq: number;
  }
  const [date, setDate] = useState<Date>(new Date());
  const [holidata, setHoliDate] = useState<Holiday[] | undefined>([]);
  const getHoliday = async () => {
    // const strMonth =
    //   String(date.getMonth()).length < 2
    //     ? "0" + String(date.getMonth() + 1)
    //     : String(date.getMonth() + 1);

    const url = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?ServiceKey=${process.env.REACT_APP_HOLIDAY_KEY}&solYear=${date.getFullYear()}&numOfRows=20`;

    try {
      const response = await axios.get(url);
      const holidataArr = Array.isArray(response.data.response.body.items.item)
        ? [...response.data.response.body.items.item]
        : [response.data.response.body.items.item];
      if (holidataArr[0] === undefined) holidataArr.pop();
      setHoliDate(holidataArr);
      console.log("fybc,data");
      return response;
    } catch (error) {
      console.error("There was a problem with your axios request:", error);
      throw error;
    }
  };
  useEffect(() => {
    const processData = async () => {
      try {
        const data = await getHoliday();
        console.log(data, "fetch 완료");
      } catch (err) {
        console.error(err);
      }
    };
    processData();
  }, [date.getFullYear()]);

  const dayWeek: string[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <Container>
      <MonthHead date={date} setDate={setDate} />
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
        <Week date={date} holidata={holidata} />
      </DaysBox>
    </Container>
  );
}
