import styled from "styled-components";
import { forwardRef } from "react";
import { ReactComponent as Arrow } from "../Img/ep_arrow-right-bold.svg";

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
      gap: 1rem;
      span {
        font-size: var(--header-size);
        font-weight: 600;
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

const Arrowimg = styled(Arrow)`
  width: 100%;
  height: 100%;
`;

const ReverseArrow = styled(Arrowimg)`
  transform: scaleX(-1);
`;

interface Prop {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}
const MonthHead = forwardRef<null | HTMLDivElement, Prop>(
  ({ date, setDate }, ref) => {
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

    const changeMonth = (count: number) => {
      const nowDate = new Date(date.getTime());
      let [yearCount, monthCount] = [0, 0];

      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.style.animationPlayState = "running";
      }

      if (nowDate.getMonth() + (count % 12) + 1 > 12) {
        yearCount++;
        monthCount = (count % 12) - 12;
      } else if (nowDate.getMonth() + (count % 12) + 1 <= 0) {
        yearCount--;
        monthCount = (count % 12) + 12;
      } else {
        monthCount = count % 12;
      }

      nowDate.setFullYear(nowDate.getFullYear() + yearCount);
      nowDate.setMonth(nowDate.getMonth() + monthCount);
      setDate(nowDate);
    };

    return (
      <MonthBox>
        <div>
          <ArrowBtn onClick={() => changeMonth(-1)}>
            <Arrowimg />
          </ArrowBtn>
          <div className="timeBox">
            <span>{date.getFullYear()}</span>
            <span>{monthArr[date.getMonth()]}</span>
          </div>

          <ArrowBtn onClick={() => changeMonth(1)}>
            <ReverseArrow />
          </ArrowBtn>
        </div>
      </MonthBox>
    );
  }
);
export default MonthHead;
