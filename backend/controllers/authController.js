import * as authModel from "../models/User.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

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

  function signOnToken(payload) {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    console.log(token);
    return token;
  }

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
      const signToken = signOnToken({ email: req.body.email, id: User._id });
      //cookies
      const expDate = 1000 * 60 * 60 * 24 * 365;
      res.cookie("loggedin", signToken, {
        sameSite: "lax",
        maxAge: expDate,
        httpOnly: true,
      });

      res.json({
        message: "Erfolgleich eingeloggt",
        email: req.body.email,
        id: User._id,
        signToken,
      });
      // function verifyToken(token) {
      //   const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      //   console.log(verified);
      // }
      // setTimeout(() => {
      //   verifyToken(token);
      //   console.log("jwt expired");
      // }, 3000);
    } else {
      const err = new Error("Login nicht erfolgreich");
      err.statusCode = 401;
      throw err;
    }
  } catch (err) {
    return next(err);
  }
};
