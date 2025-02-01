import express from "express";
import {
  deleteLand,
  getLandDetail,
  createLand,
  listLand,
  updateLand,
} from "../controllers/land.controller.js";

const router = express.Router();

router.get("/", listLand);
router.get("/:id", getLandDetail);
router.post("/create", createLand);
router.put("/update/:id", updateLand);
router.delete("/delete/:id", deleteLand);
export default router;
