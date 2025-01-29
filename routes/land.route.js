import express from "express";
import createLand from "../controllers/land.controller.js";

const router = express.Router();

router.post("/create", createLand);

export default router;
