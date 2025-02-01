import express from "express";
import {
  createProperty,
  deleteProperty,
  getPropertyDetail,
  listProperties,
  updatePrperty,
} from "../controllers/property.controller.js";

const router = express.Router();

router.get("/", listProperties);
router.get("/:id", getPropertyDetail);
router.post("/create", createProperty);
router.put("/update/:id", updatePrperty);
router.delete("/delete/:id", deleteProperty);

export default router;
