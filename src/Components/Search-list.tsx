import styled from "styled-components";

const SearchBox = styled.li`
  width: 100%;
  min-height: 40px;
  height: auto;
  display: flex;
  padding: 1rem;
  justify-content: start;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
  span {
    font-size: 18px;
    font-weight: 500;
  }
`;

const ColorBox = styled.div`
  width: 24px;
  height: 24px;
  background: ${(prop) => prop.color || "var(--line-gray)"};
`;

export default function SearchList() {
  return (
    <>
      <SearchBox>
        <ColorBox color={"yellow"}></ColorBox>
        <span>Homework</span>
        <span>2024년 1월 11일</span>
        <span>오전 9시 ~ 10시</span>
        <span>algorithm</span>
      </SearchBox>
    </>
  );
}
