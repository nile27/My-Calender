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
  const { startDate, endDate, startTime, endTime, name, tagName, color, done } =
    req.body;
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
      year: String(firstDate.getFullYear()),
      month: String(firstDate.getMonth() + 1),
      day: String(firstDate.getDate()),
      $or: [
        { startTime: { $gte: startTime, $lte: endTime } },
        { endTime: { $gte: startTime, $lte: endTime } },
      ],
    });
    console.log(contacts);

    if (contacts.length) {
      res
        .status(409)
        .send(
          `${contacts[0].year}-${contacts[0].month}-${contacts[0].day} 와 일정이 중복됩니다.`
        );
      return;
    }

    lastDate = `${firstDate.getFullYear()}-${
      firstDate.getMonth() + 1
    }-${firstDate.getDate()}`;

    i += 1;
  }
  res.json("일정이 추가 되었습니다.");
});

export default { getYearData, postYearData };
