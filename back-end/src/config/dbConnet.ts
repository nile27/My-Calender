import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  const url:string|undefined = process.env.DB_CONNECT;
  try {
    if(url){
      const connect = await mongoose.connect(url);
    }
    console.log("DB connected");
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;
