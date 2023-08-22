import express from "express";
import {
  UpdateProfileController,
  loginController,
  profileController,
  registerController,
} from "../controllers/authController.js";
import { isSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/profile", isSignIn, profileController);
router.put("/updateProfile", isSignIn, UpdateProfileController);
router.get("/test", isSignIn, (req, res) => {
  res.send("hello wCodes");
});
export default router;
