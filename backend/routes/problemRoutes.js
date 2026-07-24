import express from "express";
import { getProblems } from "../controllers/problemController.js";
import { login, signup, refreshToken, logout } from "../controllers/authController.js";

const router = express.Router();

router.get("/", getProblems);

export default router;