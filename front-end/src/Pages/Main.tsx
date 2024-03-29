import styled from "styled-components";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { TodoSlice, selectTodo } from "../Slice/todoSlice";
import { TodaySlice, selectTodayDate } from "../Slice/todayDate";
import { isUpdateSlice } from "../Slice/isUpdate";
import { PickDateSlice } from "../Slice/pickDateSlice";
import tagFilterSlice, { selectTagDate } from "../Slice/tagFilter";

import { TODOOBJArr } from "../type";

import Plus from "../Img/mingcute_add-fill.svg";
import TodoLi from "../Components/Main-TodoLI";
import Scheduler from "../Components/Main-Schedule";
import Modal from "../Components/Main_AddTodo";
import isShowNavTag from "../Slice/isShowNavTag";

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  padding: 2rem 3rem;
  gap: 10%;
  @media screen and (max-width: 860px) {
    flex-direction: column;
    justify-content: start;
  }
`;

const TodoContainer = styled.div`
  width: 100%;
  max-width: 800px;
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
  max-width: 800px;

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

interface TodaySelect {
  year: string | undefined;
  month: string | undefined;
  day: string | undefined;
}

export default function Main() {
  const scrollRef = useRef<null | HTMLLIElement>(null);
  const dispatch = useDispatch();
  const today = useSelector(selectTodayDate);
  const tagArr = useSelector(selectTagDate);

  const { value, visit } = tagArr;
  const todoData: TODOOBJArr[] = useSelector(selectTodo);
  const filterData: TODOOBJArr[] = todoData.filter(
    (item: TODOOBJArr) =>
      !visit[
        value.findIndex(
          (el) => el.tagName === item.tagName && el.color === item.color
        )
      ]
  );

  const [modal, setModal] = useState<boolean>(false);
  const params = useParams();

  const todoArr: TODOOBJArr[] = [];

  const doneArr: TODOOBJArr[] = [];

  const todayTime: [string, TODOOBJArr | undefined][] = Array.from(
    { length: 24 },
    (_, i) => {
      const idx: string = String(i).length === 1 ? `0${String(i)}` : String(i);
      const todoIdx: number = filterData.findIndex((el: TODOOBJArr) => {
        return el.startTime <= Number(idx) && Number(idx) <= el.endTime;
      });

      return todoIdx === -1 ? [idx, undefined] : [idx, filterData[todoIdx]];
    }
  );
  filterData.forEach((el) => {
    return el.done ? doneArr.push(el) : todoArr.push(el);
  });
  const isUpdateModalFunc = () => {
    setModal(!modal);
    dispatch(isUpdateSlice.actions.isUpdate(false));
  };

  useEffect(() => {
    dispatch(isShowNavTag.actions.isUpdate(true));
    const MainDateFunc = () => {
      if (
        params.year !== undefined &&
        params.day !== undefined &&
        params.month !== undefined
      ) {
        localStorage.setItem(
          "date",
          JSON.stringify(`${params.year}-${params.month}-${params.day}`)
        );
        dispatch(TodaySlice.actions.year(params.year));
        dispatch(TodaySlice.actions.month(params.month));
        dispatch(TodaySlice.actions.day(params.day));
        dispatch(
          PickDateSlice.actions.startDate({
            year: String(params.year),
            month: String(params.month),
            day: String(params.day),
          })
        );
        dispatch(
          PickDateSlice.actions.endDate({
            year: String(params.year),
            month: String(params.month),
            day: String(params.day),
          })
        );
      } else {
        dispatch(TodaySlice.actions.month(String(new Date().getFullYear())));
        dispatch(TodaySlice.actions.month(String(new Date().getMonth() + 1)));
        dispatch(TodaySlice.actions.day(String(new Date().getDate())));
        dispatch(
          PickDateSlice.actions.startDate({
            year: String(new Date().getFullYear()),
            month: String(new Date().getMonth() + 1),
            day: String(new Date().getDate()),
          })
        );
        dispatch(
          PickDateSlice.actions.endDate({
            year: String(new Date().getFullYear()),
            month: String(new Date().getMonth() + 1),
            day: String(new Date().getDate()),
          })
        );
      }
      dispatch(PickDateSlice.actions.startTime(new Date().getHours()));
      dispatch(PickDateSlice.actions.endTime(new Date().getHours()));
    };

    const dataFunc = async () => {
      try {
        const selectToday: TodaySelect = {
          year: params.year ? params.year : String(new Date().getFullYear()),
          month: params.month
            ? params.month
            : String(new Date().getMonth() + 1),
          day: params.day ? params.day : String(new Date().getDate()),
        };
        const res = await axios.get(
          `${process.env.REACT_APP_PUBLIC_URL}/today/${selectToday.year}/${selectToday.month}/${selectToday.day}`
        );

        const { data } = res;
        const tagData: { tagName: string; color: string }[] = data
          .filter((item: TODOOBJArr) => {
            return item.tagName && { tagName: item.tagName, color: item.color };
          })
          .map((item: TODOOBJArr) => {
            return { tagName: item.tagName, color: item.color };
          });

        dispatch(TodoSlice.actions.update(data));
        dispatch(tagFilterSlice.actions.get(tagData));
        localStorage.setItem(
          "date",
          JSON.stringify(
            `${selectToday.year}-${selectToday.month}-${selectToday.day}`
          )
        );
        sessionStorage.setItem("todoData", JSON.stringify(data));

        return res;
      } catch (err) {
        throw err;
      }
    };

    MainDateFunc();
    dataFunc();
  }, [params]);

  useEffect(() => {
    const timelineScroll = () => {
      if (scrollRef.current) {
        scrollRef.current?.scrollIntoView({
          block: "start",
        });
      }
    };
    timelineScroll();
  }, [today]);

  return (
    <Container>
      <TodoContainer>
        <TodoBox>
          <div className="Header">
            <span>To do</span>
            <button onClick={isUpdateModalFunc}>
              <img src={Plus} alt="Add" />
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
              return key === new Date().getHours() ? (
                <Scheduler time={item} key={key} ref={scrollRef} />
              ) : (
                <Scheduler time={item} key={key} ref={undefined} />
              );
            }
          )}
          <li className="blank" />
        </ul>
      </ScheduleBox>
      {modal && <Modal modal={modal} setModal={setModal} />}
    </Container>
  );
}
