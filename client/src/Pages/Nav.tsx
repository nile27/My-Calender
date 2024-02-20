import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

import Home from "../Img/akar-icons_home-alt1.svg";
import Calender from "../Img/ic_baseline-calendar-month.svg";
import Search from "../Img/mingcute_search-line.svg";
import Logo from "../Img/cbi_mg.svg";
import DownArrow from "../Img/ep_arrow-down-bold.svg";
import Hamburger from "../Img/ci_hamburger-lg.svg";

const Container = styled.div`
  width: 16.375rem;
  height: 100%;
  padding: 1rem 0rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media screen and (max-width: 1100px) {
    width: auto;
    height: 100%;
    position: absolute;
    z-index: 180;

    .downArrow {
      width: 24px;
      height: 24px;
      transition: all 0.3s ease-in-out;
      img {
        width: 24px;
        height: 24px;
      }
      &:hover {
        transform: rotate(180deg);
      }
    }
  }
`;

const Downmenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: white;
  width: auto;
  height: auto;
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
  background-color: white;
`;

const Listli = styled.button`
  witdh: 100%;
  min-height: 1.5rem;
  height: auto;
  padding: 10px 1.25rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: white;
  transition: background-color 0.2s ease-in-out;
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

const DownListBox = styled(ListBox)`
  width: 100px;
  background-color: white;
  padding: 0;
`;

const DownListli = styled(Listli)`
  width: 100%;
  text-align: center;
  justify-content: center;
  padding: 0px;
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const View: boolean = useMediaQuery({
    query: "(max-width:1100px)",
  });

  return (
    <Container>
      {View ? (
        <>
          <button className="downArrow" onClick={() => setIsOpen(!isOpen)}>
            <img src={Hamburger}></img>
          </button>
          {isOpen ? (
            <Downmenu>
              <DownListBox>
                <span>Menu</span>

                <DownListli onClick={() => navi(`/`)}>
                  <span>Home</span>
                </DownListli>

                <DownListli onClick={() => navi("/month")}>
                  <span>Month</span>
                </DownListli>

                <DownListli onClick={() => navi("/search")}>
                  <span>Search</span>
                </DownListli>
              </DownListBox>
            </Downmenu>
          ) : null}
        </>
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
}
