import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Home from "../Img/akar-icons_home-alt1.svg";
import Calender from "../Img/ic_baseline-calendar-month.svg";
import Search from "../Img/mingcute_search-line.svg";
import Logo from "../Img/cbi_mg.svg";
import DownArrow from "../Img/ep_arrow-down-bold.svg";
const Container = styled.div`
  width: 16.375rem;
  height: 100%;
  padding: 1rem 0rem 1rem 1rem;
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
    color: var(--dark-gray);
    font-size: 24px;
    font-weight: 400;
  }
  > div {
    display: flex;
    flex-direction: column;
  }
`;

const ListBox = styled.div`
  width: 100%;
  height: 13rem;
  padding: 1rem 0rem 1rem 1rem;
  gap: 1.4rem;
  display: flex;
  flex-direction: column;
`;

const Listli = styled.button`
  witdh: 100%;
  min-height: 1.5rem;
  height: auto;
  padding: 10px 1.25rem;
  display: flex;
  align-items: center;
  gap: 2rem;

  &:hover {
    background: var(--whiteblue);
  }
  &:focus {
    background: var(--whiteblue);
  }
  > span {
    font-size: 20px;
  }
`;

const TagBtn = styled(Listli)`
  &:hover {
    background: none;
  }
`;

const ColorBox = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: ${(prop) => prop.color || `var(--light-gray)`};
`;

export default function Nav() {
  const navi = useNavigate();

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

        <Listli onClick={() => navi(`/`)}>
          <img src={Home}></img>
          <span>Home</span>
        </Listli>

        <Listli onClick={() => navi("/month")}>
          <img src={Calender}></img>
          <span>Month</span>
        </Listli>

        <Listli onClick={() => navi("/search")}>
          <img src={Search}></img>
          <span>Search</span>
        </Listli>
      </ListBox>
      <ListBox>
        <span>Menu</span>
        <TagBtn>
          <ColorBox color={"blue"}></ColorBox>
          <span>Work</span>
        </TagBtn>
      </ListBox>
    </Container>
  );
}
