import styled from "styled-components";
import SearchImg from "../Img/mingcute_search-line.svg";

import SearchList from "../Components/Search-list";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 7%;
  padding: 0.5rem 1rem 1rem 1rem;
  border-bottom: 1px solid var(--light-gray);
`;

const SearchBarBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  background-color: var(--whiteblue);
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  img {
    width: 30px;
    height: 30px;
  }
`;
const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  padding: 0 1rem;
  outline: none;
  font-size: 18px;
  font-weight: 500;
`;

const ResultBox = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  padding: 1rem;
`;

export default function Search() {
  return (
    <Container>
      <SearchContainer>
        <SearchBarBox>
          <img src={SearchImg}></img>
          <SearchBar></SearchBar>
        </SearchBarBox>
      </SearchContainer>
      <ResultBox>
        <SearchList></SearchList>
      </ResultBox>
    </Container>
  );
}
