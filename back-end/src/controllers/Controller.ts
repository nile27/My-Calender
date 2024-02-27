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

interface Duplicate {
  id: string | undefined;
  year: string;
  month: string;
  day: string;
  startTime: Number;
  endTime: Number;
}

const duplicateFunc = async ({
  id,
  year,
  month,
  day,
  startTime,
  endTime,
}: Duplicate): Promise<PostData[]> => {
  if (id) {
    const contacts = await CalenderData.find({
      _id: { $ne: "65dd85695f8a1bb5d2759c97" },
      year: year,
      month: month,
      day: day,
      $or: [
        { startTime: { $gte: startTime, $lte: endTime } },
        { endTime: { $gte: startTime, $lte: endTime } },
      ],
    });
    return contacts;
  } else {
    const contacts = await CalenderData.find({
      year: year,
      month: month,
      day: day,
      $or: [
        { startTime: { $gte: startTime, $lte: endTime } },
        { endTime: { $gte: startTime, $lte: endTime } },
      ],
    });
    return contacts;
  }
};

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
  let dubplicate: PostData[] = [];
  while (lastDate !== date) {
    firstDate = new Date(
      Number(startDate.year),
      Number(startDate.month) - 1,
      Number(startDate.day) + i
    );
    dubplicate = await duplicateFunc({
      id: undefined,
      year: String(firstDate.getFullYear()),
      month: String(firstDate.getMonth() + 1),
      day: String(firstDate.getDate()),
      startTime: startTime,
      endTime: endTime,
    });

    if (dubplicate.length) {
      res
        .status(409)
        .send(
          `${dubplicate[0].year}-${dubplicate[0].month}-${dubplicate[0].day} 와 일정이 중복됩니다.`
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

const postTodoDone = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id }: { id: string } = req.params as { id: string };

    try {
      const document = await CalenderData.findById(id);

      if (!document) {
        res.status(404).json({ message: "문서를 찾을 수 없습니다." });
        return;
      }

      document.done = !document.done;

      await document.save();

      res.status(200).json(document);
    } catch (error) {
      console.error("Error toggling done status:", error);
      res.status(500).json({ message: "서버 오류 발생" });
    }
  }
);

const patchYearData = asyncHandler(async (req: Request, res: Response) => {
  const { id }: { id: string } = req.params as { id: string };
  const { startDate, startTime, name, endTime, tagName, color } = req.body;
  let dubplicate: PostData[] = [];
  const tagFilter = await Tag.findOne({ tagName: tagName, color: color });

  dubplicate = await duplicateFunc({
    id: id,
    year: startDate.year,
    month: startDate.month,
    day: startDate.day,
    startTime: startTime,
    endTime: endTime,
  });

  if (dubplicate.length) {
    res
      .status(409)
      .send(
        dubplicate[0].startTime !== dubplicate[0].endTime
          ? `${dubplicate[0].startTime}시-${dubplicate[0].endTime}시의 일정이 중복됩니다.`
          : `${dubplicate[0].startTime}시의 일정이 중복됩니다.`
      );
    return;
  }
  const upDate = await CalenderData.findOneAndUpdate(
    { _id: id },
    {
      startTime: startTime,
      endTime: endTime,
      tagName: tagName,
      color: color,
      name: name,
    },
    { new: true }
  );
  if (!tagFilter) {
    Tag.create({ tagName: tagName, color: color });
  }

  res.status(200).json(upDate);
});

const deleteYearData = asyncHandler(async (req: Request, res: Response) => {
  const { id }: { id: string } = req.params as { id: string };
  const deleteTodo = await CalenderData.deleteOne({ _id: id });

  res.status(200).json(deleteTodo);
});

export default {
  getYearData,
  postYearData,
  patchYearData,
  deleteYearData,
  postTodoDone,
};
