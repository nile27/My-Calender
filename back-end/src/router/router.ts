import express, { Router, Request, Response, NextFunction } from "express";
import Controller from "../controllers/Controller";
const router: Router = express.Router();

router
  .route("/today/:year/:month/:day")
  .get(Controller.getYearData)
  .post(Controller.postYearData);

router.route("/today/:id").patch(Controller.patchYearData);

module.exports = router;
