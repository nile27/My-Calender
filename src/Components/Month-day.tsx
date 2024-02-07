import styled from "styled-components";

const DayBox = styled.li`
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
    text-align: center;
    font-size: var(--normal-size);
    background-color: var(--skyblue);
    border-radius: 50%;
  }
`;

export default function Day(props: { day: number; today: number }) {
  return props.day !== 0 ? (
    props.today !== props.day ? (
      <DayBox>
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
    ) : (
      <TodayBox>
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
    )
  ) : (
    <DayBox></DayBox>
  );
}
