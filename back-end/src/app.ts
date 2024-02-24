import express from 'express';
import dbConnect from "./config/dbConnet";
import cors from 'cors';

const app:express.Application = express();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/", require("./router/router.ts"));


app.listen(4000, () => {
  console.log("✅ Server listening on 4000");
});