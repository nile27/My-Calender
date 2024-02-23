import styled from "styled-components";

export const CheckBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 1.5rem;
  background: white;
  margin-top: 1rem;
`;
export const CheckBtn = styled.button`
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
