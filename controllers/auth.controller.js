import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

const signup = async (req, res, next) => {
  // Hash the password before saving
  const { username, email, password } = req.body;
  if (password.length < 6) {
    return next(errorHandler("Password must be at least 6 characters", 400));
  }
  try {
    const saltRounds = 10; // Number of rounds to generate salt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json("User created successfully..");
  } catch (error) {
    next(error);
  }
};

export default signup;
