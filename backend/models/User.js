import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

const userModel = mongoose.model("Users", userSchema);

export const create = async (document) => {
  const result = await userModel.create(document);
  return result;
};

export const getOne = async (document) => {
  const result = await userModel.findOne(document);
  return result;
};
