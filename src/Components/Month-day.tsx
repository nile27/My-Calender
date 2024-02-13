import styled from "styled-components";
import { useNavigate } from "react-router";
import { OnClick, NumberProp } from "../type";

const DayBox = styled.li<OnClick>`
  width: 100%;
  height: 100%;
  border: 1px solid var(--line-gray);
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5%;

  .numberBox {
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
  }

  .TodoBox {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    flex-direction: column;
    padding: 0.5rem;
    gap: 1rem;
    overflow-y: scroll;
    flex: 1 1 0;

    li {
      width: 100%;
      height: 12px;
      display: flex;
      gap: 1rem;
      .colorBox {
        height: 100%;
        width: 12px;
        background-color: ${(prop) => prop.color || "var(--line-gray)"};
      }
      span {
        font-size: 12px;
      }
    }
  }

  &:hover {
    background: var(--whiteblue);
  }
`;

const Number = styled.div<NumberProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  color: ${(prop) => prop.color || "black"};
  font-size: var(--normal-size);
  background-color: ${(prop) => prop.background || "var(--skyblue)"};
  border-radius: 50%;
  text-align: center;
  padding: 13px;
`;

const HolidayBox = styled.div`
  display: flex;
  jutify-content: start;
  width: 70%;
  height: auto;
  min-height: auto;
  padding: 0 5px;
`;

const HolidaySpan = styled.span`
  font-size: var(--small-size);
  font-weight: 500;
  color: ${(prop) => prop.color || "black"};
  white-space: normal;
`;

type DataHoliday = {
  dateName: string;
  isHoliday: string;
};

export default function Day(props: {
  month: number;
  holiday: DataHoliday | undefined;
  day: number;
  nowYear: number;
  getday: number;
}) {
  const navi = useNavigate();
  const date = new Date();

  function todayFunc(): boolean {
    return (
      date.getFullYear() === props.nowYear &&
      date.getMonth() + 1 === props.month &&
      date.getDate() === props.day
    );
  }

  function colorFunc(): string {
    if (props.holiday) {
      return props.holiday.isHoliday === "Y" ? "red" : "black";
    } else {
      switch (props.getday) {
        case 0:
          return "red";
        case 6:
          return "blue";
      }
    }
    return "black";
  }

  return props.day !== 0 ? (
    <DayBox onClick={() => navi(`/today/${props.month}/${props.day}`)}>
      <div className="numberBox">
        <Number
          background={todayFunc() ? "var(--skyblue)" : "none"}
          color={todayFunc() ? "white" : colorFunc()}
        >
          {props.day}
        </Number>
        <HolidayBox>
          <HolidaySpan
            color={props.holiday?.isHoliday === "Y" ? "red" : "black"}
          >
            {props.holiday ? props.holiday.dateName : null}
          </HolidaySpan>
        </HolidayBox>
      </div>

      <ul className="TodoBox">
        <li>
          <div className="colorBox"></div> <span>algorithm</span>
        </li>
        <li>
          <div className="colorBox"></div> <span>algorithm</span>
        </li>
        <li>
          <div className="colorBox"></div> <span>algorithm</span>
        </li>
        <li>
          <div className="colorBox"></div> <span>algorithm</span>
        </li>
        <li>
          <div className="colorBox"></div> <span>algorithm</span>
        </li>
        <li>
          <div className="colorBox"></div> <span>algorithm</span>
        </li>
        <li>
          <div className="colorBox"></div> <span>algorithm</span>
        </li>
      </ul>
    </DayBox>
  ) : (
    <DayBox></DayBox>
  );
}
