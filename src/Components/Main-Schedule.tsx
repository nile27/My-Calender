import styled from "styled-components";

import { TODOOBJArr } from "../Pages/Main";

const TodoList = styled.li`
  display: flex;
  width: 100%;
  height: 100px;
  min-height: 100px;
  background: var(--white);
  padding: 1rem;
  gap: 1rem;
  border-bottom: 1px solid var(--light-gray);

  > span {
    font-weight: 400;
    white-space: nowrap;
  }
`;

const ColorBox = styled.div`
  width: 5px;
  background-color: ${(prop) => prop.color || "var(--line-gray)"};
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

  .time {
    display: flex;
    jutify-content: start;

    span {
      font-size: var(--normal-size);
      color: var(--light-gray);
    }
  }
`;

export default function TodoLi(props: {
  time: [string, TODOOBJArr | undefined];
}) {
  const [hour, todo]: [string, TODOOBJArr | undefined] = props.time;
  return (
    <TodoList>
      <span>{hour + " 시"}</span>
      <ColorBox color={todo?.color} />
      <ListBody>
        <span>{todo?.name}</span>
        <div className="time">
          <span>{todo?.tag}</span>
        </div>
      </ListBody>
    </TodoList>
  );
}
