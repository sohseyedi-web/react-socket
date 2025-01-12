import express from "express";
import { getAllUserData,userProfile } from "../controllers/UsersController";

const router = express.Router();

router.get("/list", getAllUserData);
router.get("/profile", userProfile);

export default router;
