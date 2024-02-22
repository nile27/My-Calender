import styled from "styled-components";
import { useState } from "react";

import XBtn from "../Img/ph_x-bold.svg";

const Contatiner = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 20px;
  background: white;
  box-shadow: 5px 5px 5px 5px var(--line-gray);
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

const SelectBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;
const SelectContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem 1rem 1rem 0.5rem;
  border-bottom: 1px solid var(--light-gray);

  .tagBox {
    display: flex;
    gap: 1rem;
  }
  .tagPick {
    display: flex;
    justift-content: center;
    align-items: center;

    padding-top: 10px;
    padding-left: 10px;
  }
`;

const TagColorBox = styled.div`
  width: 24px;
  height: 24px;
  background: ${(p) => p.color || "var(--line-gray)"};
`;

const CheckBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: white;
  margin-top: 2rem;
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
  addTag: boolean;
  setAddTag: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TagPicker(prop: Prop) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [boxColor, setBoxColor] = useState<string>("");
  const { addTag, setAddTag } = prop;
  const arr = [
    "red",
    "blue",
    "black",
    "purple",
    "black",
    "purple",
    "black",
    "purple",
    "black",
    "purple",
  ];

  return (
    <Contatiner>
      <HeaderDiv>
        <button onClick={() => setAddTag(!addTag)}>
          <img className="Ximg" src={XBtn} />
        </button>
      </HeaderDiv>
      <ModalInput placeholder="태그 이름" />
      <SelectContainer>
        <span>태그 색상</span>
        <div className="tagBox">
          <div className="tagPick">
            <TagColorBox color={boxColor} onClick={() => setIsOpen(!isOpen)} />
          </div>
          <SelectBox>
            {arr.map((item: string, key: number) => (
              <TagColorBox
                color={item}
                key={key}
                onClick={() => {
                  setBoxColor(item);
                }}
              />
            ))}
          </SelectBox>
        </div>
      </SelectContainer>
      <CheckBox>
        <CheckBtn onClick={() => setAddTag(!addTag)}>확인</CheckBtn>
        <CheckBtn onClick={() => setAddTag(!addTag)}>취소</CheckBtn>
      </CheckBox>
    </Contatiner>
  );
}
