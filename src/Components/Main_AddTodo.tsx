import styled from "styled-components";
// import axios from "axios";
import { useEffect, useState } from "react";

const BackgroundBox = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  position: absolute;
  border: 1px solid black;
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
  top: 10rem;
  left: 53%;
`;

interface Prop {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTodo(props: Prop) {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const { modal, setModal } = props;
  const resizeWidth: number = width * 0.3;
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  console.log(resizeWidth);
  return (
    <BackgroundBox onClick={() => setModal(!modal)}>
      <Container></Container>
    </BackgroundBox>
  );
}
