import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { PickDateSlice } from "../Slice/pickDateSlice";
import { TodoSlice, selectTodo } from "../Slice/todoSlice";
import { isUpdateSlice } from "../Slice/isUpdate";
import { TODOOBJArr } from "../type";

import Modal from "./Main_AddTodo";
import { ReactComponent as Check } from "../Img/cil_check-alt.svg";
import Plus from "../Img/mingcute_add-fill.svg";

const TodoList = styled.li`
  display: flex;
  width: 100%;
  height: 100px;
  min-height: 80px;
  background: var(--white);
  border-radius: 30px;
  align-items: center;
  gap: 2rem;
  padding: 0 2rem;
`;

const CheckBtn = styled.button`
  width: auto;
  height: auto;

  display: flex;
  jutify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1.5px solid black;
  path {
    fill: black;
  }

  & :hover {
    background: black;
    border-radius: 50%;
    path {
      fill: white;
    }
  }
`;

const CheckedBtn = styled(CheckBtn)`
  background-color: black;
  path {
    fill: white;
  }

  & :hover {
    background: white;
    border-radius: 50%;
    path {
      fill: black;
    }
  }
`;

const CheckImg = styled(Check)`
  width: auto;
  height: auto;
  padding: 0.1rem;
`;

const ListBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  span {
    font-weight: 600;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tag {
    display: flex;
    gap: 1rem;
    span {
      font-size: var(--small-size);
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media screen and (max-width: 460px) {
      flex-direction: column;
    }
  }
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(prop) =>
    prop.color === "null" ? "var(--line-gray)" : prop.color};
  @media screen and (max-width: 460px) {
    display: none;
  }
`;

export default function TodoLi(props: { todo: TODOOBJArr }) {
  const { name, tag, color, done, time } = props.todo;
  const dispatch = useDispatch();
  const select = useSelector(selectTodo);
  const [modal, setModal] = useState<boolean>(false);

  const UpdateOnclick = () => {
    dispatch(PickDateSlice.actions.name(name));
    dispatch(PickDateSlice.actions.tagName(tag));
    dispatch(PickDateSlice.actions.tagColor(color));
    dispatch(PickDateSlice.actions.startTime(time));
    setModal(!modal);
    dispatch(isUpdateSlice.actions.isUpdate(true));
  };

  const doneOnclick = () => {
    const idx: number = select.findIndex(
      (el) => el.tag === tag && el.name === name
    );
    dispatch(TodoSlice.actions.done(idx));
  };

  return (
    <TodoList>
      {done ? (
        <CheckedBtn onClick={doneOnclick}>
          <CheckImg />
        </CheckedBtn>
      ) : (
        <CheckBtn onClick={doneOnclick}>
          <CheckImg />
        </CheckBtn>
      )}

      <ListBody>
        <span>{name}</span>
        <div className="tag">
          <ColorBox color={color} />
          {tag}
        </div>
      </ListBody>
      <button onClick={UpdateOnclick}>
        <img src={Plus} />
      </button>
      {!modal ? null : <Modal modal={modal} setModal={setModal} />}
    </TodoList>
  );
}
