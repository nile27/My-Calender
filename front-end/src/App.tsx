import { Route, Routes, BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyle";

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
  position: relative;
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
            <Route path="/" element={<Main />} />
            <Route path="/today/:year/:month/:day" element={<Main />} />
            <Route path="/month" element={<Month />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BodyContainer>
      </Container>
    </BrowserRouter>
  );
}

export default App;
