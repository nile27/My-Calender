import styled from "styled-components";
// import axios from "axios";

const BackgroundBox = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: transparent;
  position: absolute;
  z-index: 120;
  overflow: hidden;
`;

const Container = styled.div`
  width: 450px;
  height: 550px;
  display: flex;
  flex-direction: column;
  justfy-content: center;
  align-items: center;
  background: var(--whiteblue);
  border-radius: 20px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

interface Prop {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTodo(props: Prop) {
  const { modal, setModal } = props;

  return (
    <BackgroundBox onClick={() => setModal(!modal)}>
      <Container></Container>
    </BackgroundBox>
  );
}
