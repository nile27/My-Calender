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
  tagName: string | null;
  color: string;
  done: boolean;
}

interface CreateData {
  _id: string;
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

    // Convert Document array to PostData array
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

    // Convert Document array to PostData array
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
  console.log(req.body);
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
      const createdData = await CalenderData.create({
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

      if (
        year === String(firstDate.getFullYear()) &&
        month === String(firstDate.getMonth() + 1) &&
        day === String(firstDate.getDate())
      )
        arr.push({
          _id: createdData._id.toString(),
          year: createdData.year,
          month: createdData.month,
          day: createdData.day,
          startTime: createdData.startTime,
          endTime: createdData.endTime,
          name: createdData.name,
          tagName: createdData.tagName || null, // undefined인 경우 null로 처리
          color: createdData.color,
          done: createdData.done,
        });
      console.log(lastDate, date, req.params);
    }

    lastDate = `${firstDate.getFullYear()}-${
      firstDate.getMonth() + 1
    }-${firstDate.getDate()}`;

    i += 1;
  }

  if (tagName && !tagFilter) {
    Tag.create({ tagName: tagName, color: color });
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
    : null;

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
  if (tagName && !tagFilter) {
    Tag.create({ tagName: tagName, color: color });
  }

  res.status(200).json(upDate);
});

// Main - Delete /today/:id
const deleteYearData = asyncHandler(async (req: Request, res: Response) => {
  const { id }: { id: string } = req.params as { id: string };
  try {
    const deleteTodo = await CalenderData.deleteOne({ _id: id });

    if (!deleteTodo.deletedCount) {
      res.status(404).json({ message: "문서를 찾을 수 없습니다." });
    } else {
      res.status(200).json({ message: "일정이 삭제되었습니다." });
    }
  } catch (err) {
    console.error("Error toggling done status:", err);
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
      console.error("Error toggling done status:", error);
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
      console.log(document);
      if (!document) {
        res.status(404).json({ message: "문서를 찾을 수 없습니다." });
        return;
      }
      res.status(200).json(document);
    } catch (error) {
      console.error("Error toggling done status:", error);
      res.status(500).json({ message: "서버 오류 발생" });
    }
  }
);

// const resetDatabase = async () => {
//   try {
//     // CalenderData 컬렉션 내 모든 문서 삭제
//     await CalenderData.deleteMany({});
//     // Tag 컬렉션 내 모든 문서 삭제
//     await Tag.deleteMany({});
//     console.log("데이터베이스가 성공적으로 초기화되었습니다.");
//   } catch (error) {
//     console.error("데이터베이스 초기화 중 오류가 발생했습니다:", error);
//   }
// };

// resetDatabase();

export default {
  getYearData,
  postYearData,
  patchYearData,
  deleteYearData,
  postTodoDone,
  searchFunc,
};
