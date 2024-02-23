import styled, { keyframes } from "styled-components";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { useSelector, useDispatch } from "react-redux";
import { selectPickDate, PickDateSlice } from "../Slice/pickDateSlice";

import Arrow from "../Img/ep_arrow-right-bold.svg";

const UlKeyframe = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, -10%, 0);
}

to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
}
`;
const DateWapper = styled.div`
  animation: ${UlKeyframe} 0.2s ease-in-out;
  position: absolute;
  z-index: 200;
  .react-datepicker {
    padding: 16px;
    width: 300px;

    .react-datepicker__header {
      background-color: #fff;
      color: #fff;
      border-bottom: none;
      border-radius: 0;
    }

    .react-datepicker__month-container {
      padding-bottom: 16px;
      margin-bottom: 8px;
      border-bottom: 1px solid #d4d6dd;

      .react-datepicker__day-names {
        width: 280px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        .react-datepicker__day-name {
          display: flex;
          width: 40px;
          height: 40px;
          justify-content: center;
          align-items: center;
        }
      }

      .react-datepicker__current-month {
        float: left;
      }

      .react-datepicker__month {
        margin: 0px;
      }

      .react-datepicker__week {
        width: 280px;
        display: flex;
        justify-content: space-around;

        > * {
          display: flex;
          width: 40px;
          height: 40px;
          justify-content: center;
          align-items: center;
          color: var(--neutral-dark-medium, #494a50);
          text-align: center;

          font-family: Inter;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }

        .react-datepicker__day--selected {
          border-radius: 20px;
          background: var(--highlight-darkest, #006ffd);
          display: flex;
          width: 40px;
          height: 40px;
          justify-content: center;
          align-items: center;
          color: #fff;
        }
      }
    }

    .react-datepicker__children-container {
      width: 300px;
    }
  }
`;
const StyledDatePicker = styled(ReactDatePicker)`
  .react-datepicker {
    padding: 16px;
    width: 300px;

    .react-datepicker__header {
      background-color: #fff;
      color: #fff;
      border-bottom: none;
      border-radius: 0;
    }
  }
`;

const Customhead = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
  color: black;
  span {
    font-weight: 500;
  }
  .btnBox {
    display: flex;
    gap: 1rem;
  }
  margin: 5px 0;
`;

const PrevButton = styled.div`
  style: none;
  cursor: pointer;
  width: 15px;
  height: 15px;
  background-image: url(${Arrow});
  background-size: cover;
`;

// 다음 달로 이동하는 버튼
const NextButton = styled(PrevButton)`
  transform: scaleX(-1);
`;

interface Prop {
  setDatePicker: React.Dispatch<React.SetStateAction<boolean>>;

  datepicker: boolean;
}

export default function DatePicker(props: Prop) {
  const { datepicker, setDatePicker } = props;

  const pickDate = useSelector(selectPickDate);
  const dispatch = useDispatch();

  const handleDatePicker = (date: [Date, Date]) => {
    if (date[1]) {
      setDatePicker(!datepicker);
    }
    dispatch(PickDateSlice.actions.startDate(date[0]));
    dispatch(PickDateSlice.actions.endDate(date[1]));

    // console.log(startDate, endDate);
  };
  console.log(pickDate);

  return (
    <DateWapper>
      <StyledDatePicker
        locale={ko}
        startDate={pickDate.startDate}
        endDate={pickDate.endDate}
        onChange={(date: [Date, Date]) => handleDatePicker(date)}
        selectsRange
        closeOnScroll
        inline
        popperContainer={CalendarContainer}
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <Customhead>
            <span>{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</span>
            <div className="btnBox">
              <PrevButton onClick={decreaseMonth} />
              <NextButton onClick={increaseMonth} />
            </div>
          </Customhead>
        )}
      />
    </DateWapper>
  );
}
