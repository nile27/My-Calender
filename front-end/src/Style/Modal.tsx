import styled from "styled-components";

export const BackgroundBox = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: transparent;
  position: fixed;
  z-index: 100;
  overflow: hidden;
`;

export const Container = styled.div`
  width: 450px;
  height: auto;
  max-height: 500px;
  display: flex;
  flex-direction: column;

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

export const ModalInputBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: start;
  gap: 1rem;
`;
export const HeaderDiv = styled.div`
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
