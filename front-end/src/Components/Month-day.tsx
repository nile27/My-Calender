import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { isShowNavTag } from "../Slice/isShowNavTag";
import { OnClick, NumberProp, MonthTodo } from "../type";

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
    overflow-x: ellipsis;

    flex: 1 1 0;

    li {
      width: 100%;
      height: auto;
      display: flex;
      gap: 1rem;
      flex: 1 1 0;
      span {
        flex: 1 1 0;
        display: inline_block;
        overflow: hidden;
        width: auto;
        max-width: 70%;
        font-size: 10px;
        text-overflow: ellipsis;
        font-weight: 600;
      }
    }
  }

  &:hover {
    background-color: var(--whiteblue);
  }

  @media screen and (min-width: 800px) and (max-width: 950px) {
    .TodoBox {
      li {
        .colorBox {
          display: none;
        }

        span {
          font-size: 10px;
        }
      }
    }
  }

  @media screen and (max-width: 800px) {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    padding: 0.5rem 0;

    .TodoBox {
      padding: 5px;
      white-space: nowrap;
      li {
        white-space: nowrap;
        text-overflow: ellipsis;

        padding: 0;
        .colorBox {
          display: none;
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
  background-color: ${(prop) => prop.background_color || "var(--skyblue)"};
  border-radius: 50%;
  text-align: center;
  padding: 0.7rem 0.7rem;

  @media screen and (max-width: 950px) {
    width: auto;
    height: auto;
    padding: 0.1rem 0.4rem;
  }
  @media screen and (max-width: 375px) {
    font-size: 12px;
  }
`;

const HolidayBox = styled.div`
  display: flex;
  jutify-content: start;
  width: 70%;
  height: auto;
  min-height: auto;
  padding: 0 5px;
  @media screen and (max-width: 800px) {
    padding: 0;
  }
`;

const HolidaySpan = styled.span`
  font-size: var(--small-size);
  font-weight: 500;
  color: ${(p) => p.color || "black"};
  white-space: normal;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const ColorBox = styled.div`
  height: 100%;
  max-height: 12px;
  width: 12px;
  background-color: ${(prop) => prop.color || "var(--line-gray)"};

  @media screen and (min-width: 800px) and (max-width: 950px) {
    display: none;
  }

  @media screen and (max-width: 800px) {
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
  todoDay: MonthTodo | undefined;
}) {
  const navi = useNavigate();
  const dispatch = useDispatch();
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
    }
    switch (props.getday) {
      case 0:
        return "red";
      case 6:
        return "blue";
      default:
        return "";
    }

    return "black";
  }

  const dayOnClick = (url: string) => {
    navi(url);
    dispatch(isShowNavTag.actions.isUpdate(true));
  };

  return props.day !== 0 ? (
    <DayBox
      onClick={() =>
        dayOnClick(`/today/${props.nowYear}/${props.month}/${props.day}`)
      }
    >
      <div className="numberBox">
        <Number
          background_color={todayFunc() ? "var(--skyblue)" : "white"}
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
        {props.todoDay &&
          props.todoDay.name.map((item: string, key: number) => {
            return (
              <li key={key}>
                <ColorBox
                  className="colorBox"
                  color={
                    props.todoDay?.color[key] === "null"
                      ? undefined
                      : props.todoDay?.color[key]
                  }
                />
                <span>{item}</span>
              </li>
            );
          })}
      </ul>
    </DayBox>
  ) : (
    <DayBox />
  );
}
