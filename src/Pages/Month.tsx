import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
`;

export default function Month() {
  const monthList = (nowDate: Date) => {
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth();

    // const dayOneWeek = new Date(nowYear, nowMonth, 1).getDay();
    // const dayLastWeek = new Date(nowYear, nowMonth + 1, 0).getDay();

    const result: Date[] = [];
    //const prevMonthEnd = new Date(nowYear, nowMonth, 1).getDate();
    const nowMonthEnd = new Date(nowYear, nowMonth + 1, 0).getDate();

    for (let i = 1; i <= nowMonthEnd; i++) {
      result.push(new Date(nowYear, nowMonth, i));
    }

    return result;
  };

  const date = new Date();
  const allDay: Date[] = monthList(date);
  allDay.map((day: Date) => console.log(day.getDate()));
  return <Container></Container>;
}
