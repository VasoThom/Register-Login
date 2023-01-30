import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
const payload = {
  userId: 2,
  name: "Vaso",
};
const token = jwt.sign(
  payload,
  process.env.TOKEN_SECRET //{
  //   expiresIn: "300s"},
);
console.log(token);
function verifyToken(token) {
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(verified);
  } catch (err) {
    console.log(err.message);
  }
}
setTimeout(() => {
  verifyToken(token);
  console.log("jwt expired");
}, 3000);
