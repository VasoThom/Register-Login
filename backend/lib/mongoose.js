import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
//console.log(process.env.MONGODB_URI);
mongoose
  .set("strictQuery", true)
  .connect(`${process.env.MONGODB_URI}/${process.env.DBNAME}`)
  .then(() => console.log("connected via mongoose"));
