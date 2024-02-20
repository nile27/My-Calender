import styled from "styled-components";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { TODOdata, TODOOBJArr } from "../type";
import Plus from "../Img/mingcute_add-fill.svg";
import TodoLi from "../Components/Main-TodoLI";
import Scheduler from "../Components/Main-Schedule";
import Modal from "../Components/Main_AddTodo";

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  padding: 2rem 3rem;
  gap: 1rem;
  @media screen and (max-width: 860px) {
    flex-direction: column;
  }
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
  padding: 2rem;

  > .Header {
    border-bottom: 1px solid var(--light-gray);
    width: 100%;

    padding: 1rem 0;
    span {
      font-size: 20px;
      font-weight: 600;
    }
  }
  ul {
    width: 100%;
    height: 95%;
    overflow-y: scroll;

    > .blank {
      width: 50%;
      height: 400px;
      min-height: 400px;
    }
  }
`;

const TodoBox = styled.div`
  width: 100%;
  height: 45%;
  border-radius: 30px;
  background: rgba(244, 244, 246, 1);
  padding: 2rem;
  position: relative;
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
  const scrollRef = useRef<null | HTMLLIElement>(null);
  const [todoData, setTodoDate] = useState<TODOdata>({});
  const [modal, setModal] = useState<boolean>(false);
  const params = useParams();
  console.log(params);

  const todoArr: TODOOBJArr[] = [];

  const doneArr: TODOOBJArr[] = [];

  const todayTime: [string, TODOOBJArr | undefined][] = Array.from(
    { length: 24 },
    (_, i) => {
      const idx: string = String(i).length === 1 ? "0" + String(i) : String(i);

      return [idx, todoData[idx]];
    },
  );
  Object.keys(todoData).forEach((el) => {
    return todoData[el].done
      ? doneArr.push(todoData[el])
      : todoArr.push(todoData[el]);
  });

  const time: number = new Date().getHours();

  useEffect(() => {
    const dataFunc = async () => {
      try {
        const res = await axios.get("http://localhost:4000/Todo");
        const data = res.data;
        setTodoDate(data);
        return res;
      } catch (err) {
        throw err;
      }
    };

    const timelineScroll = () => {
      if (scrollRef.current) {
        scrollRef.current?.scrollIntoView({
          block: "start",
        });
      }
    };
    timelineScroll();
    dataFunc();
  }, []);

  return (
    <Container>
      <TodoContainer>
        <TodoBox>
          <div className="Header">
            <span>To do</span>
            <button onClick={() => setModal(!modal)}>
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
              return key === time ? (
                <Scheduler time={item} key={key} ref={scrollRef} />
              ) : (
                <Scheduler time={item} key={key} ref={undefined} />
              );
            },
          )}
          <li className="blank"></li>
        </ul>
      </ScheduleBox>
      {modal ? <Modal modal={modal} setModal={setModal} /> : null}
    </Container>
  );
}
