import jwt from "jsonwebtoken";

//erstellt ein token
export const signToken = (payload) => {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET);
  return token;
};
