import express from "express";
import {
  createCar,
  deleteCar,
  getCarDetail,
  listCar,
  updateCar,
} from "../controllers/car.controller.js";

const router = express.Router();

router.get("/", listCar);
router.get("/:id", getCarDetail);
router.post("/create", createCar);
router.put("/update/:id", updateCar);
router.delete("/delete/:id", deleteCar);

export default router;
