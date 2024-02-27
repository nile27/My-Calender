import asyncHandler from "express-async-handler";
import CalenderData from "../models/dateModel";
import Tag from "../models/tagModel";
import { Request, Response } from "express";

interface PostData {
  year: string;
  month: string;
  day: string;
  startTime: Number;
  endTime: Number;
  name: string;
  tagName: string;
  color: string;
  done: boolean;
}

const getYearData = asyncHandler(async (req: Request, res: Response) => {
  const { year, month, day } = req.params;
  const contacts = await CalenderData.find({
    year: year,
    month: month,
    day: day,
  });

  res.status(200).json(contacts);
});

const postYearData = asyncHandler(async (req: Request, res: Response) => {
  const { startDate, endDate, startTime, endTime, name, tagName, color, done } =
    req.body;
  const tagFilter = await Tag.findOne({ tagName: tagName, color: color });
  let firstDate: Date = new Date();
  let lastDate: string = "";
  let i: number = 0;
  let arr: PostData[] = [];
  let date = `${endDate.year}-${Number(endDate.month)}-${endDate.day}`;
  let contacts: PostData[] = [];
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

    if (contacts.length) {
      res
        .status(409)
        .send(
          `${contacts[0].year}-${contacts[0].month}-${contacts[0].day} 와 일정이 중복됩니다.`
        );
      return;
    } else {
      arr.push({
        year: String(firstDate.getFullYear()),
        month: String(firstDate.getMonth() + 1),
        day: String(firstDate.getDate()),
        startTime: startTime,
        endTime: endTime,
        name: name,
        tagName: tagName,
        color: color,
        done: done,
      });
    }

    lastDate = `${firstDate.getFullYear()}-${
      firstDate.getMonth() + 1
    }-${firstDate.getDate()}`;

    i += 1;
  }
  arr.forEach((el: PostData) => CalenderData.create({ ...el }));
  if (!tagFilter) {
    Tag.create({ tagName: tagName, color: color });
  }

  res.status(200).json("일정이 추가 되었습니다.");
});

export default { getYearData, postYearData };
