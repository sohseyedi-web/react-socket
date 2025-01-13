import express from "express";
import { getAllUserData, userProfile } from "../controllers/UsersController";

const router = express.Router();

router.get("/list", getAllUserData);
router.get("/profile", async (req, res, next) => {
  await userProfile(req, res, next);
});

export default router;
