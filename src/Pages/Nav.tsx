import styled from "styled-components";
import Home from "../Img/akar-icons_home-alt1.svg";
import Calender from "../Img/ic_baseline-calendar-month.svg";
import Search from "../Img/mingcute_search-line.svg";
import Logo from "../Img/cbi_mg.svg";
import DownArrow from "../Img/ep_arrow-down-bold.svg";
const Container = styled.div`
  width: 16.375rem;
  height: 100%;
  padding: 1rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HeaderBox = styled.div`
  width: 100%;
  height: auto;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  > button {
    width: 1rem;
    height: 1rem;
  }
`;
const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0;
  gap: 0.5rem;

  > img {
    width: 45px;
    height: 45px;
  }

  > span {
    color: --dark-gray;
    font-size: 24px;
    font-weight: 400;
  }
  > div {
    display: flex;
    flex-direction: column;
  }
`;

const ListBox = styled.ul`
  width: 100%;
  height: 13rem;
  padding: 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

const Listli = styled.li`
  witdh: 100%;
  height: 1.5rem;
  padding: 0 1.25rem;
  display: flex;
  gap: 1rem;

  > div {
    width: 1rem;
    height: 1rem;
    background: red;
  }
`;

export default function Nav() {
  return (
    <Container>
      <HeaderBox>
        <HeaderContainer>
          <img src={Logo} />
          <div>
            <span>To-Do</span>
            <span>Calender</span>
          </div>
        </HeaderContainer>
        <button>
          <img src={DownArrow} />
        </button>
      </HeaderBox>
      <ListBox>
        <span>Menu</span>
        <Listli>
          <img src={Home}></img>
          <span>Home</span>
        </Listli>
        <Listli>
          <img src={Calender}></img>
          <span>Month</span>
        </Listli>
        <Listli>
          <img src={Search}></img>
          <span>Search</span>
        </Listli>
      </ListBox>
      <ListBox>
        <span>Menu</span>
        <Listli>
          <div></div>
          <span>Work</span>
        </Listli>
      </ListBox>
    </Container>
  );
}
