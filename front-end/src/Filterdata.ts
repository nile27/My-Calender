import { useSelector } from "react-redux";
import { selectTodo } from "./Slice/todoSlice";
import { selectTagDate } from "./Slice/tagFilter";

import { TODOOBJArr } from "./type";

export default function filterData() {
  const todoData: TODOOBJArr[] = useSelector(selectTodo);
  const tagFilter = useSelector(selectTagDate);
  const tagValue = tagFilter.value.map((item) => item.tagName);

  const todoArr: TODOOBJArr[] = [];

  const doneArr: TODOOBJArr[] = [];

  const todayTime: [string, TODOOBJArr | undefined][] = Array.from(
    { length: 24 },
    (_, i) => {
      const idx: string = String(i).length === 1 ? `0${String(i)}` : String(i);
      const todoIdx: number = todoData.findIndex(
        (el) => el.time <= idx && idx < el.end && tagValue.includes(el.tag)
      );

      return todoIdx === -1 ? [idx, undefined] : [idx, todoData[todoIdx]];
    }
  );
  todoData.forEach((el) => {
    return el.done ? doneArr.push(el) : todoArr.push(el);
  });
  return todayTime;
}
