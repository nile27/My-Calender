import asyncHandler from "express-async-handler";
import CalenderData from "../models/dateModel";
import { Request, Response } from "express";

interface Data {
  year: string;
  month: string;
  day: string;
  time: string;
  end: string;
  name: string;
  tagName: string;
  color: string;
  done: boolean;
}

const getYearData = asyncHandler(async (req: Request, res: Response) => {
  const { month, day } = req.params;
  const contacts = await CalenderData.find({
    month: "2",
    day: "20",
  });
  console.log(req.params, contacts);
  res.json(contacts);
});

const postYearData = asyncHandler(async (req: Request, res: Response) => {
  const { startDate, endDate, name, tagName, color, done } = req.body;
  let firstDate: Date = new Date();
  let lastDate: string = "";
  let i: number = 0;
  let arr: { year: Number; month: Number; day: Number }[] = [];
  let date = `${endDate.year}-${Number(endDate.month)}-${endDate.day}`;
  let contacts: Data[] = [];
  while (lastDate !== date) {
    firstDate = new Date(
      Number(startDate.year),
      Number(startDate.month) - 1,
      Number(startDate.day) + i
    );
    contacts = await CalenderData.find({
      month: String(firstDate.getMonth() + 1),
      day: String(firstDate.getDate()),
    });

    if (contacts) {
      res.send("일정이 중복 되었습니다.");
      return;
    }

    lastDate = `${firstDate.getFullYear()}-${
      firstDate.getMonth() + 1
    }-${firstDate.getDate()}`;

    i += 1;
  }

  // const data = await CalenderData.create({
  //   year,
  //   month,
  //   day,
  //   name,
  //   tagName,
  //   color,
  //   done,
  // });
  console.log(req.body, date, contacts);
  res.json(arr);
});

export default { getYearData, postYearData };
