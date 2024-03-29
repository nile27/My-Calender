import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios, { isAxiosError } from "axios";
import { selectTodayDate } from "../Slice/todayDate";
import { selectPickDate, PickDateSlice, reset } from "../Slice/pickDateSlice";
import { isUpdate } from "../Slice/isUpdate";
import TodoSlice, { selectTodo } from "../Slice/todoSlice";
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
import { TODOOBJArr } from "../type";
import tagFilterSlice from "../Slice/tagFilter";
import tagSelectSlice, { selectTagList } from "../Slice/tagSelect";

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
  const [tagpicker, setTagPicker] = useState<boolean>(false);
  const [timepicker, setTimePicker] = useState<boolean>(false);
  const [datepicker, setDatePicker] = useState<boolean>(false);

  const [addTag, setAddTag] = useState<boolean>(false);

  const pickDate = useSelector(selectPickDate);
  const today = useSelector(selectTodayDate);
  const isUpdateModal = useSelector(isUpdate);
  const todo = useSelector(selectTodo);
  const TagList = useSelector(selectTagList);

  const dispatch = useDispatch();

  const dataReset = () => {
    const localData = localStorage.getItem("date");
    const parseData = localData ? JSON.parse(localData).split("-") : [];
    dispatch(
      PickDateSlice.actions.startDate({
        year: parseData[0],
        month: parseData[1],
        day: parseData[2],
      })
    );
    dispatch(
      PickDateSlice.actions.endDate({
        year: parseData[0],
        month: parseData[1],
        day: parseData[2],
      })
    );
    dispatch(PickDateSlice.actions.startTime(new Date().getHours()));
    dispatch(PickDateSlice.actions.endTime(new Date().getHours()));
  };

  const TagOnclickFunc = (color: string, name: string) => {
    dispatch(PickDateSlice.actions.tagColor(color));
    dispatch(PickDateSlice.actions.tagName(name));
    setTagPicker(!tagpicker);
  };
  const ModalCloseFunc = () => {
    setModal(!modal);
    dispatch(reset());
    dataReset();
  };

  const handlePostTodo = async () => {
    if (!pickDate.name) {
      alert("제목을 입력해주세요.");
      ModalCloseFunc();
      return;
    }
    setModal(!modal);
    if (!isUpdateModal) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_PUBLIC_URL}/today/${today.year}/${today.month}/${today.day}`,
          { ...pickDate }
        );

        const sessionDataString = sessionStorage.getItem("todoData");

        if (sessionDataString) {
          const sessionData = JSON.parse(sessionDataString);
          dispatch(TodoSlice.actions.postUpdate(res.data.updatedContact[0]));
          if (sessionData) sessionData.push(res.data.updatedContact[0]);

          sessionStorage.setItem("todoData", JSON.stringify(sessionData));
          dispatch(
            tagFilterSlice.actions.add({
              tagName: pickDate.tagName,
              color: pickDate.color,
            })
          );

          dispatch(reset());
          dataReset();
        }
      } catch (err) {
        if (isAxiosError(err)) {
          if (err.response && err.response.status === 409) {
            alert(err.response.data);
          } else {
            ModalCloseFunc();
            alert("제목을 입력해주세요");
          }
          dispatch(reset());
          dataReset();
        }
      }
    } else {
      try {
        const res = await axios.patch(
          `${process.env.REACT_APP_PUBLIC_URL}/today/${pickDate._id}`,
          { ...pickDate }
        );

        const sessionDataString = sessionStorage.getItem("todoData");

        if (sessionDataString) {
          const sessionData = JSON.parse(sessionDataString);
          dispatch(TodoSlice.actions.patchUpdate(res.data));

          if (sessionData) {
            const idx: number = sessionData.findIndex(
              (el: TODOOBJArr) => el._id === res.data._id
            );
            sessionData[idx] = { ...res.data };
          }
          sessionStorage.setItem("todoData", JSON.stringify(sessionData));

          dispatch(reset());
          dataReset();
        }
      } catch (err) {
        if (isAxiosError(err)) {
          if (err.response && err.response.status === 409) {
            alert(err.response.data);
          } else {
            ModalCloseFunc();
            alert("제목을 입력해주세요");
          }
        }
        dispatch(reset());
        dataReset();
      }
    }
  };

  const deleteFunc = async () => {
    if (!pickDate.name) {
      alert("제목을 입력해주세요.");
      ModalCloseFunc();
      return;
    }
    try {
      const undefinedTagName: string = pickDate.tagName
        ? pickDate.tagName
        : "undefined";
      const res = await axios.delete(
        `${process.env.REACT_APP_PUBLIC_URL}/today/${pickDate._id}/${undefinedTagName}/${pickDate.color}`
      );

      const sessionDataString = sessionStorage.getItem("todoData");
      if (sessionDataString) {
        sessionStorage.setItem("todoData", JSON.stringify(todo));
        dispatch(TodoSlice.actions.deleteUpdate(pickDate._id));
      }
      if (res.data.data) {
        dispatch(tagSelectSlice.actions.get(res.data.data));
      }
      alert(res.data.message);
    } catch (error) {
      if (isAxiosError(error)) {
        alert("일정 삭제에 실패하였습니다.");
      }
    }
    ModalCloseFunc();
  };

  useEffect(() => {
    const tagDataFunc = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_PUBLIC_URL}/tag`);
        dispatch(tagSelectSlice.actions.get(res.data));
      } catch (error) {
        if (isAxiosError(error)) {
          alert("삭제에 실패 하였습니다.");
        }
      }
    };
    tagDataFunc();
  }, [todo]);

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
              {pickDate.color ? (
                <InitTag
                  onClick={() => {
                    setTagPicker(!tagpicker);
                    if (addTag) setAddTag(false);
                  }}
                >
                  <div className="flexBtn">
                    <TagColorBox color={pickDate.color} />
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
                  {TagList.value.map(
                    (item: { color: string; tagName: string }, key) => {
                      return (
                        <SelectTag
                          key={key}
                          onClick={() =>
                            TagOnclickFunc(item.color, item.tagName)
                          }
                        >
                          <TagColorBox color={item.color}> </TagColorBox>
                          <span>{item.tagName}</span>
                        </SelectTag>
                      );
                    }
                  )}
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
            {!isUpdateModal ? (
              <CheckBtn onClick={ModalCloseFunc}>취소</CheckBtn>
            ) : (
              <CheckBtn onClick={deleteFunc}>삭제</CheckBtn>
            )}
          </CheckBox>
        </ModalInputBox>
      </Container>
    </>
  );
}
