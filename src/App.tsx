import { Route, Routes, BrowserRouter } from "react-router-dom";
import GlobalStyles from "./GlobalStyle";
import styled from "styled-components";
import Main from "./Pages/Main";
import Nav from "./Pages/Nav";

const Container = styled.div`
  display: flex;
  width: 80rem;
  height: 45rem;
  gap: 1rem;
  padding: 1.25rem;
  align-items: flex-start;
  border: 1px solid black;
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Container>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
