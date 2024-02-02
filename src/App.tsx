import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import GlobalStyles from "./GlobalStyle";
import styled from "styled-components";

import Main from "./Pages/Main";
import Nav from "./Pages/Nav";
import Month from "./Pages/Month";

const Container = styled.div`
  display: flex;
  width: 80rem;
  height: 45rem;
  gap: 1rem;
  padding: 1.25rem;
  align-items: flex-start;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
  > div {
    height: 95%;
  }
`;
const HeadBox = styled.div`
  display: flex;
  height: 5%;
  width: 100%;
  gap: 1rem;
  padding: 0 1rem;
  justify-content: end;

  > .today {
    color: #5b5b5b;
  }
  > span {
    font-weight: 600;
  }
`;

function App() {
  const [clock, setClock] = useState<string>();

  useEffect(() => {
    const Timer = setInterval(() => {
      const time: Date = new Date();
      setClock(
        time.getFullYear() +
          " . " +
          (time.getMonth() + 1) +
          " . " +
          time.getDate() +
          " _ " +
          time.getHours() +
          " : " +
          time.getMinutes(),
      );
    }, 1000);

    return () => {
      clearInterval(Timer);
    };
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Container>
        <Nav />
        <BodyContainer>
          <HeadBox>
            <span className="today">Today</span>
            <span>{clock}</span>
          </HeadBox>

          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/month" element={<Month />}></Route>
          </Routes>
        </BodyContainer>
      </Container>
    </BrowserRouter>
  );
}

export default App;
