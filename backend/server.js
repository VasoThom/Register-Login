import express from "express";
import authRoutes from "../backend/routes/authRoutes.js";

import cors from "cors";

import "./lib/mongoose.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.json());

app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(err.message);
});

app.listen(port, () => {
  console.log("listening on port", port);
});
