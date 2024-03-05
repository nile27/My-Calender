import asyncHandler from "express-async-handler";
import CalenderData from "../models/dateModel";
import Tag from "../models/tagModel";
import { Request, Response } from "express";
import { Document } from "mongoose";

interface PrevTag extends Document {
  tagName: string;
  color: string;
  count: number;
}

interface PostData {
  year: string;
  month: string;
  day: string;
  startTime: Number;
  endTime: Number;
  name: string;
  tagName: string | null;
  color: string;
  done: boolean;
}
interface CreateData {
  year: string;
  month: string;
  day: string;
  startTime: Number;
  endTime: Number;
  name: string;
  tagName: string | null;
  color: string;
  done: boolean;
}

interface MonthTodo {
  color: string[];
  name: string[];
  tagName: string[];
  year: string;
  month: string;
  day: string;
}

interface Duplicate {
  id: string | undefined;
  year: string;
  month: string;
  day: string;
  startTime: Number;
  endTime: Number;
}
// 중복 처리 함수
const duplicateFunc = async ({
  id,
  year,
  month,
  day,
  startTime,
  endTime,
}: Duplicate): Promise<PostData[]> => {
  let contacts: PostData[];

  if (id) {
    const documents = await CalenderData.find({
      _id: { $ne: id },
      year: year,
      month: month,
      day: day,
      $or: [
        { startTime: { $gte: startTime, $lte: endTime } },
        { endTime: { $gte: startTime, $lte: endTime } },
      ],
    });

    contacts = documents.map((doc) => ({
      year: doc.year,
      month: doc.month,
      day: doc.day,
      startTime: doc.startTime,
      endTime: doc.endTime,
      name: doc.name,
      tagName: doc.tagName || null,
      color: doc.color,
      done: doc.done,
    }));
  } else {
    const documents = await CalenderData.find({
      year: year,
      month: month,
      day: day,
      $or: [
        { startTime: { $gte: startTime, $lte: endTime } },
        { endTime: { $gte: startTime, $lte: endTime } },
      ],
    });

    contacts = documents.map((doc) => ({
      year: doc.year,
      month: doc.month,
      day: doc.day,
      startTime: doc.startTime,
      endTime: doc.endTime,
      name: doc.name,
      tagName: doc.tagName || null,
      color: doc.color,
      done: doc.done,
    }));
  }

  return contacts;
};

// Main - get /today/:year/:month/:day
const getYearData = asyncHandler(async (req: Request, res: Response) => {
  const { year, month, day } = req.params;

  const contacts = await CalenderData.find({
    year: year,
    month: month,
    day: day,
  });

  res.status(200).json(contacts);
});

// Main - post /today/:year/:month/:day
const postYearData = asyncHandler(async (req: Request, res: Response) => {
  const { year, month, day } = req.params;
  const { startDate, endDate, startTime, endTime, name, tagName, color, done } =
    req.body;
  const tagFilter = await Tag.findOne({ tagName: tagName, color: color });
  let firstDate: Date = new Date();
  let lastDate: string = "";
  let i: number = 0;
  let arr: CreateData[] = [];
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

  for (let item of arr) {
    const createdData = await CalenderData.create({ ...item });
  }

  if (tagName && !tagFilter) {
    Tag.create({ count: 1, tagName: tagName, color: color });
  } else if (tagName && tagFilter) {
    if (tagFilter && typeof tagFilter.count === "number") {
      tagFilter.count += 1;
      await tagFilter.save();
    }
  }

  res.status(200).json({
    message: "일정이 추가 되었습니다.",
    updatedContact: arr,
  });
});

// Main - patch /today/:id
const patchYearData = asyncHandler(async (req: Request, res: Response) => {
  const { id }: { id: string } = req.params as { id: string };
  const { startDate, startTime, name, endTime, tagName, color } = req.body;
  let dubplicate: PostData[] = [];
  const tagFilter = tagName
    ? await Tag.findOne({ tagName: tagName, color: color })
    : (null as PrevTag | null);
  const prevData: PostData | null = await CalenderData.findOne({ _id: id });

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
      tagName: tagName ? tagName : "",
      color: color,
      name: name,
    },
    { new: true }
  );

  if (
    tagName &&
    !tagFilter &&
    prevData &&
    !prevData.tagName &&
    prevData.color === "null"
  ) {
    Tag.create({ count: 1, tagName: tagName, color: color });
  } else if (tagName && !tagFilter && prevData && prevData.tagName) {
    Tag.create({ count: 1, tagName: tagName, color: color });
    const prevTag = (await Tag.findOne({
      tagName: prevData.tagName,
      color: prevData.color,
    })) as PrevTag | null;
    if (prevTag && prevTag.count === 1) {
      await Tag.findOneAndDelete({
        tagName: prevData.tagName,
        color: prevData.color,
      });
    } else if (prevTag && prevTag.count > 1) {
      if (prevTag && typeof prevTag.count === "number") {
        prevTag.count = prevTag.count - 1;
        await prevTag.save();
      }
    }
  } else if (tagName && tagFilter && prevData) {
    const prevTag = (await Tag.findOne({
      tagName: prevData.tagName,
      color: prevData.color,
    })) as PrevTag | null;
    if (prevTag && prevTag.count === 1) {
      await Tag.deleteOne({ tagName: prevData.tagName, color: prevData.color });
    } else if (prevTag && prevTag.count > 1) {
      if (prevTag && typeof prevTag.count === "number") {
        prevTag.count = prevTag.count + 1;
        await prevTag.save();
      }
    }
    if (tagFilter && typeof tagFilter.count === "number") {
      tagFilter.count = tagFilter.count + 1;
      await tagFilter.save();
    }
  }

  res.status(200).json(upDate);
});

// Main - Delete /today/:id
const deleteYearData = asyncHandler(async (req: Request, res: Response) => {
  const { id, tagName, color }: { id: string; tagName: string; color: string } =
    req.params as { id: string; tagName: string; color: string };
  const deleteTodo = await CalenderData.deleteOne({ _id: id });
  const deleteTag = await Tag.findOne({ tagName: tagName, color: color });
  try {
    if (!deleteTodo.deletedCount) {
      res.status(404).json({ message: "문서를 찾을 수 없습니다." });
    } else {
      if (deleteTag && typeof deleteTag.count === "number") {
        if (deleteTag.count > 1) {
          deleteTag.count -= 1;

          await deleteTag.save();

          res.status(200).json({ message: "일정이 삭제되었습니다." });
        } else {
          await Tag.deleteOne({ tagName: tagName, color: color });
          const newTagArr = await Tag.find({});
          res
            .status(200)
            .json({ message: "일정이 삭제되었습니다.", data: newTagArr });
        }
      }
    }
  } catch (err) {
    res.status(500).json({ message: "서버 오류 발생" });
  }
});

// Todo Post /todo/:id

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
      res.status(500).json({ message: "서버 오류 발생" });
    }
  }
);

// Search /search

const searchFunc = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { keyword } = req.params;

    try {
      const document = await CalenderData.find({
        $or: [{ name: keyword }, { tagName: keyword }],
      });

      if (!document || document.length === 0) {
        res.status(409).json({ message: "문서를 찾을 수 없습니다." });
        return;
      }
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ message: "서버 오류 발생" });
    }
  }
);

// Tag - tag
const getSearch = asyncHandler(async (req: Request, res: Response) => {
  const contacts = await Tag.find({});
  res.status(200).json(contacts);
});

const monthData = asyncHandler(async (req: Request, res: Response) => {
  const { year } = req.params;
  const contacts = await CalenderData.find({ year: year });

  let dummy: MonthTodo = {
    year: "",
    month: "",
    day: "",
    name: [],
    tagName: [],
    color: [],
  };
  let arr: MonthTodo[] = [];

  contacts.forEach((el) => {
    const idx = arr.findIndex(
      (item: MonthTodo) =>
        item.year === el.year && item.month === el.month && item.day === el.day
    );

    if (idx !== -1) {
      arr[idx].name.push(el.name);
      arr[idx].tagName.push(el.tagName ? el.tagName : "null");
      arr[idx].color.push(el.color);
    } else {
      dummy = {
        year: el.year,
        month: el.month,
        day: el.day,
        name: [el.name],
        tagName: el.tagName ? [el.tagName] : ["null"],
        color: [el.color],
      };
      arr.push(dummy);
    }
  });

  res.status(200).json(arr);
});

export default {
  getYearData,
  postYearData,
  patchYearData,
  deleteYearData,
  postTodoDone,
  searchFunc,
  getSearch,
  monthData,
};
