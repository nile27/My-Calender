import styled from "styled-components";
import Plus from "../Img/mingcute_add-fill.svg";
import TodoLi from "../Components/Main-TodoLI";
import Scheduler from "../Components/Main-Schedule";
export interface TODOOBJArr {
  name: string;
  tag: string;
  color: string;
  time: string;
  done: boolean;
}
export interface Tododata {
  [key: string]: TODOOBJArr;
}

export interface ScheduleData {
  [key: string]: TODOOBJArr;
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
  overflow-y: scroll;
  > .Header {
    border-bottom: 1px solid var(--light-gray);
    width: 100%;

    padding: 1rem 0;
    span {
      font-size: 20px;
      font-weight: 600;
    }

    ul {
      width: 90%;
      height: 90%;
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
  const Tododata: Tododata = {
    "03": {
      time: "09",
      name: "algorithm",
      tag: "Homework",
      color: "yellow",
      done: true,
    },
    "10": {
      time: "10",
      name: "Pen",
      tag: "What to buy",
      color: "blue",
      done: true,
    },
    "11": {
      time: "11",
      name: "pen",
      tag: "What to buy",
      color: "blue",
      done: false,
    },
    "12": {
      time: "10",
      name: "eraser",
      tag: "What to buy",
      color: "yellow",
      done: false,
    },
    "13": {
      time: "11",
      name: "pen",
      tag: "What to buy",
      color: "yellow",
      done: true,
    },
  };

  const todoArr: TODOOBJArr[] = [];

  const doneArr: TODOOBJArr[] = [];

  const todayTime: [string, TODOOBJArr | undefined][] = Array.from(
    { length: 24 },
    (_, i) => {
      const idx: string = String(i).length === 1 ? "0" + String(i) : String(i);

      return [idx, Tododata[idx]];
    },
  );
  Object.keys(Tododata).forEach((el) => {
    return Tododata[el].done
      ? todoArr.push(Tododata[el])
      : doneArr.push(Tododata[el]);
  });

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
            {todoArr.map((item: TODOOBJArr, key: number) => {
              return <TodoLi todo={item} key={key} />;
            })}
          </ul>
        </TodoBox>
        <TodoBox>
          <div className="Header">
            <span>Done</span>
          </div>
          <ul>
            {doneArr.map((item: TODOOBJArr, key: number) => {
              return <TodoLi todo={item} key={key} />;
            })}
          </ul>
        </TodoBox>
      </TodoContainer>
      <ScheduleBox>
        <div className="Header">
          <span>Today Schedule</span>
        </div>
        <ul>
          {todayTime.map(
            (item: [string, TODOOBJArr | undefined], key: number) => {
              return <Scheduler time={item} key={key} />;
            },
          )}
        </ul>
      </ScheduleBox>
    </Container>
  );
}
