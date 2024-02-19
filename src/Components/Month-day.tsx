import styled from "styled-components";
import { useNavigate } from "react-router";
import { OnClick, NumberProp } from "../type";

const DayBox = styled.li<OnClick>`
  width: 100%;
  height: 100%;
  border: 1px solid var(--line-gray);
  padding: 0.5rem;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  gap: 5%;

  .numberBox {
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    white-space: nowrap;
    overflow-x: hidden;

    flex: 1 1 0;

    li {
      width: 100%;
      height: auto;
      display: flex;
      gap: 1rem;
      .colorBox {
        height: 100%;
        width: 12px;
        background-color: ${(prop) => prop.color || "var(--line-gray)"};
      }
      span {
        font-size: 12px;
        text-overflow: ellipsis;
      }
    }
  }

  &:hover {
    background: var(--whiteblue);
  }

  @media screen and (min-width: 610px) and (max-width: 900px) {
    .numberBox {
      padding-right: 0;
    }
    .TodoBox {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      li {
        .colorBox {
          display: none;
        }

        span {
          font-size: 70%;
        }
      }
    }
  }

  @media screen and (max-width: 610px) {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    padding: 0.5rem 0;
    .numberBox {
      padding-right: 0;
    }
    .TodoBox {
      padding: 0;
      white-space: nowrap;
      overflow: hidden;

      li {
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;

        padding: 0;
        .colorBox {
          display: none;
        }

        span {
          font-size: 70%;
          text-overflow: ellipsis;
        }
      }
    }
  }
`;

const Number = styled.div<NumberProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 10%;
  color: ${(prop) => prop.color || "black"};
  font-size: var(--normal-size);
  background-color: ${(prop) => prop.background || "var(--skyblue)"};
  border-radius: 50%;
  text-align: center;
  padding: 1rem;

  @media screen and (max-width: 900px) {
    width: auto;
    height: auto;
    padding: 0.3rem;
  }
  @media screen and (max-width: 375px) {
    font-size: 70%;
  }
`;

const HolidayBox = styled.div`
  display: flex;
  jutify-content: start;
  width: 70%;
  height: auto;
  min-height: auto;
  padding: 0 5px;
  @media screen and (max-width: 900px) {
    padding: 0;
  }
`;

const HolidaySpan = styled.span`
  font-size: var(--small-size);
  font-weight: 500;
  color: ${(p) => p.color || "black"};
  white-space: normal;

  @media screen and (max-width: 900px) {
    display: none;
  }
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
          background={todayFunc() ? "var(--skyblue)" : "white"}
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
      </ul>
    </DayBox>
  ) : (
    <DayBox></DayBox>
  );
}
