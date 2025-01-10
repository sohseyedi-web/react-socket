import express from "express";
import { getMessages, sendMessage } from "../controllers/MessageController";

const router = express.Router();

router.get("/:room", getMessages);
router.post("/:room", sendMessage);

export default router;
