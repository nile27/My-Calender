import { useState } from "react";
import styled from "styled-components";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

import Xbtn from "../Img/ph_x-bold.svg";
import Arrow from "../Img/ep_arrow-right-bold.svg";

// import axios from "axios";

const BackgroundBox = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: transparent;
  position: fixed;
  z-index: 100;
  overflow: hidden;
`;

const Container = styled.div`
  width: 450px;
  max-height: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  background: white;
  border-radius: 20px;
  z-index: 110;
  position: fixed;
  padding: 2rem;
  gap: 1rem;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  box-shadow: 5px 5px 5px 5px var(--line-gray);
`;

const ModalInputBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;
const HeaderDiv = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  .Ximg {
    width: 25px;
    height: 25px;
  }
`;

const ModalInput = styled.input`
  width: 100%;
  height: auto;
  border-bottom: 1px solid var(--light-gray);
  padding: 10px;
  background: none;
`;

const ModalTime = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid var(--light-gray);
  padding: 10px;
  background: none;
`;

const TimeBlock = styled.div`
  width: 100%;
  height: auto;
  background: var(--line-gray);
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;

  box-shadow: 5px 5px 5px 5px var(--line-gray);
  padding: 1rem;
  position: relative;

  .flexBtn {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const DateWapper = styled.div`
  position: relative;
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

const DateBtn = styled.button`
  width: 100%;
  height: auto;
  background: transparent;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  span {
    white-space: no-wrap;
  }

  &:hover {
    box-shadow: 5px 5px 5px 5px var(--line-gray);
  }
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
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTodo(props: Prop) {
  const { modal, setModal } = props;
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [datepicker, setDatePicker] = useState<boolean>(false);

  // const timeArr = Array.from({ length: 24 }, (_, i) => i + 1);

  const handleDatePicker = (date: [Date, Date]) => {
    if (date[1]) {
      setDatePicker(!datepicker);
    }
    setStartDate(date[0]);
    setEndDate(date[1]);

    console.log(startDate, endDate);
  };

  return (
    <>
      <BackgroundBox onClick={() => setModal(!modal)}></BackgroundBox>
      <Container>
        <HeaderDiv>
          <button onClick={() => setModal(false)}>
            <img src={Xbtn} className="Ximg"></img>
          </button>
        </HeaderDiv>
        <ModalInputBox>
          <ModalInput placeholder="제목" />
          <ModalTime>
            <TimeBlock>
              <div className="flexBtn">
                <DateBtn onClick={() => setDatePicker(true)}>
                  <span>
                    {`${startDate.getFullYear()}년 ${startDate.getMonth() + 1}월 ${startDate.getDate()}일`}
                  </span>
                  <span>
                    {endDate !== null
                      ? `${endDate.getFullYear()}년 ${endDate.getMonth() + 1}월 ${endDate.getDate()}일`
                      : null}
                  </span>
                </DateBtn>
              </div>
              {datepicker ? (
                <DateWapper>
                  <StyledDatePicker
                    locale={ko}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(date: [Date, Date]) => handleDatePicker(date)}
                    selectsRange
                    closeOnScroll={true}
                    inline
                    popperContainer={CalendarContainer}
                    renderCustomHeader={({
                      date,
                      decreaseMonth,
                      increaseMonth,
                    }) => (
                      <Customhead>
                        <span>
                          {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
                        </span>
                        <div className="btnBox">
                          <PrevButton onClick={decreaseMonth}></PrevButton>
                          <NextButton onClick={increaseMonth}></NextButton>
                        </div>
                      </Customhead>
                    )}
                  />
                </DateWapper>
              ) : null}
            </TimeBlock>
          </ModalTime>
        </ModalInputBox>
      </Container>
    </>
  );
}
