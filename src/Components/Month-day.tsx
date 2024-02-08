import styled from "styled-components";
import { useNavigate } from "react-router";

interface DayBoxType {
  onClick?: (e: React.MouseEvent) => void;
}

const DayBox = styled.li<DayBoxType>`
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
    justify-content: start;
    align-items: center;
    padding: 0;
    .number {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
    }
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

const TodayBox = styled(DayBox)`
  .number {
    color: white;
    font-size: var(--normal-size);
    background-color: var(--skyblue);
    border-radius: 50%;
  }
`;

export default function Day(props: {
  month: number;
  day: number;
  today: number;
  thisMonth: number;
}) {
  const navi = useNavigate();

  return props.day !== 0 ? (
    props.today === props.day && props.thisMonth === props.month ? (
      <TodayBox onClick={() => navi(`/today/${props.month}/${props.day}`)}>
        <div className="numberBox">
          <div className="number">{props.day}</div>
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
      </TodayBox>
    ) : (
      <DayBox onClick={() => navi(`/today/${props.month}/${props.day}`)}>
        <div className="numberBox">
          <div className="number">{props.day}</div>
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
    )
  ) : (
    <DayBox></DayBox>
  );
}
