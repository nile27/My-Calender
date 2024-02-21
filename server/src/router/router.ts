import express, {Router,Request,Response,NextFunction} from "express";
import Controller from "../controllers/Controller";
const router: Router = express.Router();

router
  .route("/month")
  .post(Controller.getYearData);

// router
//   .route("/:year")
//   .get((req, res) => {
//     res.send(`View Contact for ID: ${req.params.id}`);
//   })
//   .put((req, res) => {
//     res.send(`Update Contact for ID : ${req.params.id}`);
//   })
//   .delete((req, res) => {
//     res.send(`Delete Contact for ID : ${req.params.id}`);
//   });

module.exports = router;