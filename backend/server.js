import express from "express";
import authRoutes from "../backend/routes/authRoutes.js";

import "./lib/mongoose.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.json());

app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening on port", port);
});
