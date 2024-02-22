import { useState } from "react";
import styled, { keyframes } from "styled-components";

import Xbtn from "../Img/ph_x-bold.svg";
import Clock from "../Img/tabler_clock.svg";
import Tag from "../Img/mdi_tag.svg";
import Plus from "../Img/mingcute_add-fill.svg";
import DownArrow from "../Img/ep_arrow-down-bold.svg";

import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import TagPicker from "./TagPicker";

// import axios from "axios";

const UlKeyframe = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, -10%, 0);
}

to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
`;
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
  bottom: 200px;
  left: 0;
  right: 0;
  margin: auto;
  box-shadow: 5px 5px 5px 5px var(--line-gray);

  @media screen and (max-width: 460px) {
    width: 300px;
    height: 500px;
  }
`;

const ModalInputBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
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
  align-items: start;
  justify-content: center;
  padding: 0 1rem;

  img {
    margin-top: 50px;
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
    flex-direction: column;
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
  align-items: center;
  @media screen and (max-width: 460px) {
    flex-direction: column;
  }
  span {
    white-space: no-wrap;
  }

  &:hover {
    box-shadow: 5px 5px 5px 5px var(--line-gray);
  }
`;

const TimeBtn = styled(DateBtn)`
  padding-right: 27%;
`;

const TagBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: start;

  border-bottom: 1px solid var(--light-gray);

  .imgBox {
    padding: 1rem 0;
    display: flex;
    align-items: start;
  }
  .plusBtn {
    padding: 1rem 0;
    display: flex;
    align-items: start;
  }
`;

const SelectContainer = styled.div`
  width: 100%;
  height: auto;

  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
`;

const InitTag = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;

  .flexBtn {
    display: flex;
    gap: 1rem;
  }
  span {
    display: flex;
    align-items: center;
    text-align: center;
    white-space: no-wrap;
  }
`;

const SelectTag = styled(InitTag)`
  padding: 0;
  justify-content: start;
`;

const TagColorBox = styled.div`
  width: 24px;
  height: 24px;
  background: ${(p) => p.color || "var(--line-gray)"};
`;

const SelectBox = styled.div`
  width: 100%;
  height: auto;
  max-height: 100px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 5px 5px 5px 5px var(--line-gray);
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;

  animation: ${UlKeyframe} 0.2s ease-in-out;
`;

interface Prop {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTodo(props: Prop) {
  const { modal, setModal } = props;
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [timepicker, setTimePicker] = useState<boolean>(false);
  const [datepicker, setDatePicker] = useState<boolean>(false);
  const [tagpicker, setTagPicker] = useState<boolean>(false);
  const [addTag, setAddTag] = useState<boolean>(false);
  const [picktime, setPicktime] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });

  const TagArr = [
    { color: "yellow", name: "homework" },
    { color: "red", name: "homework" },
    { color: "black", name: "homework" },
    { color: "black", name: "homework" },
    { color: "black", name: "homework" },
    { color: "red", name: "homework" },
    { color: "red", name: "homework" },
    { color: "red", name: "homework" },
    { color: "red", name: "homework" },
    { color: "red", name: "homework" },
  ];

  return (
    <>
      <BackgroundBox onClick={() => setModal(!modal)} />
      <Container>
        <HeaderDiv>
          <button onClick={() => setModal(false)}>
            <img src={Xbtn} className="Ximg" />
          </button>
        </HeaderDiv>
        <ModalInputBox>
          <ModalInput placeholder="제목" />
          <ModalTime>
            <img src={Clock} />
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
                <TimeBtn onClick={() => setTimePicker(!timepicker)}>
                  <span>
                    {picktime.start
                      ? `${picktime.start} : 00`
                      : `${new Date().getHours()} : 00`}
                  </span>
                  <span>
                    {picktime.end
                      ? `${picktime.end} : 00 `
                      : `${new Date().getHours()} : 00`}
                  </span>
                </TimeBtn>
                {timepicker ? (
                  <TimePicker
                    picktime={picktime}
                    setPickTime={setPicktime}
                    timepicker={timepicker}
                    setTimePicker={setTimePicker}
                  />
                ) : null}
              </div>
            </DateBlock>
          </ModalTime>
          <TagBox>
            <div className="imgBox">
              <img src={Tag} />
            </div>
            <SelectContainer>
              <InitTag
                onClick={() => {
                  setTagPicker(!tagpicker);
                  if (addTag) setAddTag(false);
                }}
              >
                <div className="flexBtn">
                  <TagColorBox />
                  <span>태그를 선택해주세요.</span>
                </div>
                <img src={DownArrow} />
              </InitTag>
              {tagpicker ? (
                <SelectBox>
                  {TagArr.map((item: { color: string; name: string }, key) => {
                    return (
                      <SelectTag
                        key={key}
                        onClick={() => {
                          setTagPicker(!tagpicker);
                        }}
                      >
                        <TagColorBox color={item.color}> </TagColorBox>
                        <span>{item.name}</span>
                      </SelectTag>
                    );
                  })}
                </SelectBox>
              ) : null}
            </SelectContainer>
            <button
              className="plusBtn"
              onClick={() => {
                setAddTag(!addTag);
                setTagPicker(false);
              }}
            >
              <img src={Plus} />
            </button>
          </TagBox>
          {addTag ? <TagPicker addTag={addTag} setAddTag={setAddTag} /> : null}
        </ModalInputBox>
      </Container>
    </>
  );
}
