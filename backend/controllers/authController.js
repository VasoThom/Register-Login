import * as authModel from "../models/User.js";
import bcrypt from "bcrypt";

export const createRegister = async (req, res, next) => {
  const hashed = await bcrypt.hash(req.body.password, 12);
  try {
    const newUser = await authModel.create({
      email: req.body.email,
      password: hashed,
    });
    res.status(201).json(newUser + "Successfully created");
  } catch (err) {
    console.log("failed");
    err.statusCode = 400;
    return next(err);
  }
};

export const createLogin = async (req, res, next) => {
  const User = await authModel.getOne({ email: req.body.email });
  try {
    if (!User) {
      const err = new Error(
        `User ${req.body.email} (not exist)is not available for authentication `
      );
      err.statusCode = 400;
      throw err;
    }

    const passwordCompare = await bcrypt.compare(
      req.body.password,
      User.password
    );

    if (passwordCompare) {
      res.json({
        email: req.body.email,
        id: User._id,
      });
    } else {
      const err = new Error("Login nicht erfolgreich");
      err.statusCode = 400;
      throw err;
    }
  } catch (err) {
    return next(err);
  }
};
