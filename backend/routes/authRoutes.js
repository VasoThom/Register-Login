import * as Controller from "../controllers/authController.js";
import { Router } from "express";

const router = Router();

router
  .post("/register", Controller.createRegister)
  .post("/login", Controller.createLogin);

export default router;
