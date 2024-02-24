import asyncHandler from "express-async-handler";
import CalenderData from "../models/dateModel";
import { Request,Response } from "express";

const getYearData = asyncHandler(async(req:Request,res:Response) => {
  // const {year,month,day,name,tagName,color,done} = req.body;

  // const data = await CalenderData.create({
  //   year,month,day,name,tagName,color,done
  // });

  res.json({name: 2, color: 2});
})


export default {getYearData} 