import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectPickDate, PickDateSlice } from "../Slice/pickDateSlice";

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  position: absolute;
  z-index: 200;
  justify-content: center;
  flex-direction: column;
  background: white;
  box-shadow: 5px 5px 5px 5px var(--line-gray);
  padding: 1rem;
  gap: 1rem;
`;
const PickerBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
`;
const StartDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

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

const SelectBox = styled.div`
  width: 100%;
  height: 100px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 1rem;
  animation: ${UlKeyframe} 0.2s ease-in-out;

  button {
    width: 100%;
    height: auto;
    cursor: pointer;
  }
`;

const TimeInput = styled.input`
  width: 100%;
  padding: 1rem;
  outline: none;
  text-align: center;
  transition: background-color 0.5s ease;

  &:disabled {
    background: var(--whiteblue);
  }
`;

const CheckBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 1.5rem;
  background: white;
  margin-top: 1rem;
`;
const CheckBtn = styled.button`
  width: 100%;
  height: auto;
  padding: 0.5rem;
  background: var(--skyblue);
  color: white;
  font-weight: 400;
  border-radius: 20px;
  transition: background-color 0.5s ease;

  &:hover {
    background: var(--whiteblue);
    color: black;
  }
`;

interface Prop {
  timepicker: boolean;
  setTimePicker: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimePicker(props: Prop) {
  const { timepicker, setTimePicker } = props;
  const picktime = useSelector(selectPickDate);
  const dispatch = useDispatch();

  const handleTimeFunc = () => {
    if (
      !picktime.startTime ||
      !picktime.endTime ||
      Number(picktime.startTime) > Number(picktime.endTime)
    ) {
      alert(
        "시작 시간보다 끝 시간이 작아야 합니다. 시간 선택을 다시 해주세요."
      );

      return;
    }
    setTimePicker(!timepicker);
  };

  const onChange = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    start: boolean
  ) => {
    const { value } = e.target as HTMLInputElement;
    if (start) {
      dispatch(PickDateSlice.actions.startTime(value));
    } else {
      dispatch(PickDateSlice.actions.endTime(value));
    }
  };

  const timeArr = Array.from({ length: 23 }, (_, i) => i + 1);
  const endTimeArr = Array.from(
    { length: 24 - Number(picktime.startTime) },
    (_, i) => Number(picktime.startTime) + 1 + i
  );
  return (
    <Container>
      <PickerBox>
        <StartDiv>
          <TimeInput
            disabled
            type="text"
            readOnly
            placeholder="시작 시간"
            value={picktime.startTime ? `${picktime.startTime} : 00` : ""}
          />
          <SelectBox>
            {timeArr.map((item: number, key: number) => {
              return (
                <button
                  key={key}
                  onClick={(e) => onChange(e, true)}
                  value={item}
                >{`${item} : 00`}</button>
              );
            })}
          </SelectBox>
        </StartDiv>

        <StartDiv>
          <TimeInput
            disabled
            type="text"
            readOnly
            placeholder="끝 시간"
            value={picktime.endTime ? `${picktime.endTime} : 00` : ""}
          />

          <SelectBox>
            {endTimeArr.map((item: number, key: number) => {
              return (
                <button
                  key={key}
                  onClick={(e) => onChange(e, false)}
                  value={item}
                >{`${item} : 00`}</button>
              );
            })}
          </SelectBox>
        </StartDiv>
      </PickerBox>
      <CheckBox>
        <CheckBtn onClick={handleTimeFunc}>확인</CheckBtn>
        <CheckBtn onClick={() => setTimePicker(!timepicker)}>취소</CheckBtn>
      </CheckBox>
    </Container>
  );
}