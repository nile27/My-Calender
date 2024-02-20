import styled from "styled-components";
import { useState, useEffect } from "react";

const HeadBox = styled.div`
  display: flex;
  height: 5%;
  width: 100%;
  gap: 1rem;
  padding: 0 1rem;
  justify-content: end;

  > .today {
    color: #5b5b5b;
  }
  > span {
    font-weight: 600;
    @media screen and (max-width: 500px) {
      font-size: 70%;
    }
  }
`;

export default function Clock() {
  const [clock, setClock] = useState<string>();

  useEffect(() => {
    const Timer = setInterval(() => {
      const time: Date = new Date();
      setClock(
        time.getFullYear() +
          " . " +
          (time.getMonth() + 1) +
          " . " +
          time.getDate() +
          " _ " +
          time.getHours() +
          " : " +
          time.getMinutes(),
      );
    }, 1000);

    return () => {
      clearInterval(Timer);
    };
  }, []);
  return (
    <HeadBox>
      <span className="today">Today</span>
      <span>{clock}</span>
    </HeadBox>
  );
}
