import User from "../models/User.js";
import { errorHandler } from "../utils/error.js";

// list all users in the system
export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
