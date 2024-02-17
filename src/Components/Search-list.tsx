import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const SearchBox = styled.li`
  width: 100%;
  min-height: 40px;
  height: auto;
  display: flex;
  padding: 1rem;
  justify-content: start;
  align-items: center;
  gap: 5%;
  flex-wrap: wrap;
  span {
    font-size: 18px;
    font-weight: 500;
  }
`;

const Search770Box = styled.li`
  width: 100%;
  height: auto;
  display: flex;
  align-items: start;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  border-bottom: 1px solid black;
  span {
    font-size: 16px;
    font-weight: 500;
    white-space: no-wrap;
  }
  .tagBox {
    width: auto;
    min-height: 24px;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .todoBox {
    width: auto;
    min-height: 24px;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  .timeBox {
    width: auto;
    min-height: 24px;
    display: flex;
    justify-content: center;
    gap: 1rem;
    @media screen and (max-width: 350px) {
      flex-direction: column;
    }
  }
`;

const ColorBox = styled.div`
  width: 24px;
  height: 24px;
  background: ${(prop) => prop.color || "var(--line-gray)"};
`;

export default function SearchList() {
  const View: boolean = useMediaQuery({
    query: "(max-width:770px)",
  });
  return (
    <>
      {View ? (
        <Search770Box>
          <div className="tagBox">
            <ColorBox color={"yellow"}></ColorBox>
            <span className="tagName">Homework</span>
          </div>
          <div className="todoBox">
            <span>Todo: </span>
            <span className="todoname">algorithm</span>
          </div>
          <div className="timeBox">
            <span className="date">2024년 1월 11일</span>
            <span className="time">오전 9시 ~ 10시</span>
          </div>
        </Search770Box>
      ) : (
        <SearchBox>
          <ColorBox color={"yellow"}></ColorBox>
          <span className="tagName">Homework</span>
          <span className="date">2024년 1월 11일</span>
          <span className="time">오전 9시 ~ 10시</span>
          <span className="todoname">algorithm</span>
        </SearchBox>
      )}
    </>
  );
}
