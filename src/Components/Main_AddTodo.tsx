import { useState } from "react";
import styled from "styled-components";

import Xbtn from "../Img/ph_x-bold.svg";
import Clock from "../Img/tabler_clock.svg";
import DatePicker from "./DatePicker";

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
  height: auto;
  border-bottom: 1px solid var(--light-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--line-gray);

  img {
    width: 24px;
    height: 24px;
  }
`;

const DateBlock = styled.div`
  width: 100%;
  height: auto;
  background-color: none;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;

  padding: 1rem;
  position: relative;

  .flexBtn {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
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
            <img src={Clock}></img>
            <DateBlock>
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
                <DatePicker
                  startDate={startDate}
                  endDate={endDate}
                  datepicker={datepicker}
                  setDatePicker={setDatePicker}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
              ) : null}
            </DateBlock>
          </ModalTime>
        </ModalInputBox>
      </Container>
    </>
  );
}
