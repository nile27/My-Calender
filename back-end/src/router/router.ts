import express, { Router, Request, Response, NextFunction } from "express";
import Controller from "../controllers/Controller";
const router: Router = express.Router();

router
  .route("/today/:year/:month/:day")
  .get(Controller.getYearData)
  .post(Controller.postYearData);
router.route("/today/:id").patch(Controller.patchYearData);
router.route("/today/:id/:tagName/:color").delete(Controller.deleteYearData);

router.route("/todo/:id").patch(Controller.postTodoDone);

router.route("/month/:year");

router.route("/search/:keyword").get(Controller.searchFunc);

router.route("/tag").get(Controller.getSearch);

router.route("/month/:year").get(Controller.monthData);

module.exports = router;
