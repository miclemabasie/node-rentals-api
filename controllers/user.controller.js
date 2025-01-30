import User from "../models/User.js";

// list all users in the system
export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = (req, res) => {
  console.log(req.body);
  res.send("creating User");
};
