import styled from "styled-components";
//import Check from "../Img/ei_check.svg";

interface TODOOBJ {
  name: string;
  tag: string;
  color: string;
}

const TodoList = styled.li`
  display: flex;
  width: 100%;
  height: 100px;
  min-height: 100px;
  background: var(--white);
`;

export default function TodoLi(props: { todo: TODOOBJ }) {
  const { name, tag, color } = props.todo;
  return (
    <TodoList>
      {name} {tag} {color}
    </TodoList>
  );
}
