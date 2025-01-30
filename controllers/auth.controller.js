import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
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

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find the user by email and include password
    const user = await User.findOne({ email }).select("+password").exec();
    if (!user) {
      return next(errorHandler("Invalid email or password", 401));
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(user.password);
      return next(errorHandler("Invalid email or password", 401));
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      "daslkjfalskdjfASDJAsd", // Secret key (store this in your .env file)
      { expiresIn: "7d" } // Token expiration time
    );

    // Send token and user info
    res.status(200).json({
      message: "User logged in successfully.",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};
