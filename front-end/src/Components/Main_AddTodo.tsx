import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { selectTodayDate } from "../Slice/todayDate";
import { selectPickDate, PickDateSlice, reset } from "../Slice/pickDateSlice";
import { isUpdate } from "../Slice/isUpdate";
import Xbtn from "../Img/ph_x-bold.svg";
import Clock from "../Img/tabler_clock.svg";
import Tag from "../Img/mdi_tag.svg";
import Plus from "../Img/mingcute_add-fill.svg";
import DownArrow from "../Img/ep_arrow-down-bold.svg";
import {
  BackgroundBox,
  Container,
  ModalInputBox,
  HeaderDiv,
} from "../Style/Modal";
import { CheckBox, CheckBtn } from "../Style/CheckBtn";

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
  padding: 0 1rem;

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
  position: relative;
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
  background: white;
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
  max-height: 150px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  z-index: 200;
  top: 100%;
  right: 0%;
  box-shadow: 5px 5px 5px 5px var(--line-gray);
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  background: white;
  animation: ${UlKeyframe} 0.2s ease-in-out;
`;

interface Prop {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTodo(props: Prop) {
  const { modal, setModal } = props;

  const [timepicker, setTimePicker] = useState<boolean>(false);
  const [datepicker, setDatePicker] = useState<boolean>(false);
  const [tagpicker, setTagPicker] = useState<boolean>(false);
  const [addTag, setAddTag] = useState<boolean>(false);

  const pickDate = useSelector(selectPickDate);
  const today = useSelector(selectTodayDate);
  const isUpdateModal = useSelector(isUpdate);
  const dispatch = useDispatch();

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

  const TagOnclickFunc = (color: string, name: string) => {
    dispatch(PickDateSlice.actions.tagColor(color));
    dispatch(PickDateSlice.actions.tagName(name));
    setTagPicker(!tagpicker);
  };

  const handlePostTodo = () => {
    setModal(!modal);
    if (!isUpdateModal) {
      return axios
        .post("http://localhost:4000/Todo", { ...pickDate })
        .then(() => dispatch(reset()))
        .catch((err) => alert(err));
    }

    return axios
      .patch("http://localhost:4000/Todo", { ...pickDate })
      .then(() => dispatch(reset()))
      .catch((err) => alert(err));
  };

  const ModalCloseFunc = () => {
    setModal(!modal);
    dispatch(reset());
    dispatch(PickDateSlice.actions.startDate({ ...today }));
    dispatch(PickDateSlice.actions.endDate({ ...today }));
  };
  console.log(pickDate.startDate, pickDate.endDate);

  return (
    <>
      <BackgroundBox onClick={ModalCloseFunc} />
      <Container>
        <HeaderDiv>
          <button onClick={ModalCloseFunc}>
            <img src={Xbtn} className="Ximg" />
          </button>
        </HeaderDiv>
        <ModalInputBox>
          <ModalInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(PickDateSlice.actions.name(e.target.value))
            }
            placeholder="제목"
            value={pickDate.name && pickDate.name}
          />
          <ModalTime>
            <img src={Clock} />
            <DateBlock>
              <div className="flexBtn">
                {isUpdateModal ? null : (
                  <DateBtn onClick={() => setDatePicker(true)}>
                    <span>
                      {pickDate.startDate.year.length !== 0
                        ? `${pickDate.startDate.year}년 ${pickDate.startDate.month}월 ${pickDate.startDate.day}일`
                        : `${today.year}년 ${today.month}월 ${today.day}일`}
                    </span>
                    <span>
                      {pickDate.endDate.year.length !== 0
                        ? `${pickDate.endDate.year}년 ${pickDate.endDate.month}월 ${pickDate.endDate.day}일`
                        : `${today.year}년 ${today.month}월 ${today.day}일`}
                    </span>
                  </DateBtn>
                )}

                {datepicker ? (
                  <DatePicker
                    datepicker={datepicker}
                    setDatePicker={setDatePicker}
                  />
                ) : null}
                <TimeBtn onClick={() => setTimePicker(!timepicker)}>
                  <span>
                    {pickDate.startTime
                      ? `${pickDate.startTime} : 00`
                      : `${new Date().getHours()} : 00`}
                  </span>
                  <span>
                    {pickDate.endTime
                      ? `${pickDate.endTime} : 00 `
                      : `${new Date().getHours()} : 00`}
                  </span>
                </TimeBtn>
                {timepicker ? (
                  <TimePicker
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
              {pickDate.tagColor ? (
                <InitTag
                  onClick={() => {
                    setTagPicker(!tagpicker);
                    if (addTag) setAddTag(false);
                  }}
                >
                  <div className="flexBtn">
                    <TagColorBox color={pickDate.tagColor} />
                    <span>{pickDate.tagName}</span>
                  </div>
                  <img src={DownArrow} />
                </InitTag>
              ) : (
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
              )}
              {tagpicker ? (
                <SelectBox>
                  {TagArr.map((item: { color: string; name: string }, key) => {
                    return (
                      <SelectTag
                        key={key}
                        onClick={() => TagOnclickFunc(item.color, item.name)}
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
          <CheckBox>
            <CheckBtn onClick={() => handlePostTodo()}>확인</CheckBtn>
            <CheckBtn onClick={ModalCloseFunc}>취소</CheckBtn>
          </CheckBox>
        </ModalInputBox>
      </Container>
    </>
  );
}
