import styled from "styled-components";
import { useState } from "react";
import axios, { isAxiosError } from "axios";

import { TODOOBJArr } from "../type";
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

  border-bottom: 1px solid var(--light-gray);
`;

const SearchBarBox = styled.div`
  width: 100%;
  height: auto;
  padding: 0.5rem 1rem;
  background-color: var(--whiteblue);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  img {
    width: 24px;
    height: 24px;
  }
`;
const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  padding: 0 1rem;
  outline: none;
  font-size: 16px;
  font-weight: 500;
`;

const ResultBox = styled.ul`
  width: 100%;
  height: 100%;

  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: scroll;
  flex: 1 1 0;
`;

export default function Search() {
  const [keyword, setKeyword] = useState<string>("");
  const [data, setData] = useState<TODOOBJArr[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleKeydown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_PUBLIC_URL}/search/${keyword}`
        );
        setData(res.data);
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          alert(error.response.data.message);
        }
      }
    }
  };
  return (
    <Container>
      <SearchContainer>
        <SearchBarBox>
          <img src={SearchImg} />
          <SearchBar
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeydown(e)}
          />
        </SearchBarBox>
      </SearchContainer>
      <ResultBox>
        {data.map((item: TODOOBJArr, key: number) => (
          <SearchList search={item} key={key} />
        ))}
      </ResultBox>
    </Container>
  );
}
