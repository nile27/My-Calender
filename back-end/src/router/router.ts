import express, { Router, Request, Response, NextFunction } from "express";
import Controller from "../controllers/Controller";
const router: Router = express.Router();

router
  .route("/today/:month/:day")
  .get(Controller.getYearData)
  .post(Controller.postYearData);

module.exports = router;
