import express from "express";
import * as authController from "../controllers/authController.js";
const router = express.Router();

router.post('/login',authController.login);
router.post('/signup',authController.signup);
router.post('/refresh-token',authController.refreshToken);
router.post('/logout',authController.logout);

export default router;