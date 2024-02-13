import { Route, Routes, BrowserRouter } from "react-router-dom";
import GlobalStyles from "./GlobalStyle";
import styled from "styled-components";

import Main from "./Pages/Main";
import Nav from "./Pages/Nav";
import Month from "./Pages/Month";
import Search from "./Pages/Search";
import Clock from "./Components/Clock";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
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
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Container>
        <Nav />
        <BodyContainer>
          <Clock />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/today/:month/:day" element={<Main />}></Route>
            <Route path="/month" element={<Month />}></Route>
            <Route path="/search" element={<Search />}></Route>
          </Routes>
        </BodyContainer>
      </Container>
    </BrowserRouter>
  );
}

export default App;
