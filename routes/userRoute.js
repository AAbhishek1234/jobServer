import express from "express";
import {
  register,
  login,
  updateProfile,
  logout,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
router.put("/updateProfile", authenticateToken, updateProfile);
router.get("/logout", authenticateToken, logout);

export default router;
