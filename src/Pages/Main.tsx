import styled from "styled-components";
import Plus from "../Img/mingcute_add-fill.svg";
import TodoLi from "../Components/Main-TodoLI";

interface TODOOBJ {
  name: string;
  tag: string;
  color: string;
}
const Container = styled.div`
  width: 100%;
  height: 90%;
  border: 1px solid black;
  display: flex;
  padding: 2rem 3rem;
  gap: 1rem;
`;

const TodoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const ScheduleBox = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  padding: 2rem;
  > .Header {
    border-bottom: 1px solid var(--line-gray);
    width: 100%;
    padding: 1rem 0;
    span {
      font-size: 20px;
      font-weight: 600;
    }
  }
`;

const TodoBox = styled.div`
  width: 100%;
  height: 45%;
  border-radius: 30px;
  background: rgba(244, 244, 246, 1);
  padding: 2rem;

  .Header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    min-heigth: 24px;
    max-height: 24px;

    span {
      font-weight: 600;
      font-size: 20px;
    }
  }

  ul {
    display: flex;
    width: 100%;
    height: 90%;
    max-height: 90%;
    gap: 10px;
    flex-direction: column;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
`;

export default function Main() {
  const Tododata: TODOOBJ[] = [
    { name: "algorithm", tag: "Homework", color: "yellow" },
    { name: "pen", tag: "What to buy", color: "blue" },
    { name: "pen", tag: "What to buy", color: "blue" },
    { name: "pen", tag: "What to buy", color: "blue" },
    { name: "pen", tag: "What to buy", color: "blue" },
    { name: "pen", tag: "What to buy", color: "blue" },
    { name: "pen", tag: "What to buy", color: "blue" },
  ];

  return (
    <Container>
      <TodoContainer>
        <TodoBox>
          <div className="Header">
            <span>To do</span>
            <button>
              <img src={Plus}></img>
            </button>
          </div>
          <ul>
            {Tododata.map((item: TODOOBJ, key: number) => {
              return <TodoLi todo={item} key={key} />;
            })}
          </ul>
        </TodoBox>
        <TodoBox>
          <div className="Header">
            <span>Done</span>
          </div>
          <ul>
            {Tododata.map((item: TODOOBJ, key: number) => {
              return <TodoLi todo={item} key={key} />;
            })}
          </ul>
        </TodoBox>
      </TodoContainer>
      <ScheduleBox>
        <div className="Header">
          <span>Today Schedule</span>
        </div>
      </ScheduleBox>
    </Container>
  );
}
