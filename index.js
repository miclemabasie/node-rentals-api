import express from "express";
import mongoose from "mongoose";
import propertyRouter from "./routes/property.route.js";
import carRouter from "./routes/car.route.js";
import landRouter from "./routes/land.route.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// connect to local database
mongoose
  .connect("mongodb://localhost:27017/rentals-api")
  .then(() => {
    console.log("Connected to database !! ");
  })
  .catch((err) => {
    console.log("Error connecting to database !! ");
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000 !! ");
});

app.use("/api/properties", propertyRouter);
app.use("/api/cars", carRouter);
app.use("/api/lands", landRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
