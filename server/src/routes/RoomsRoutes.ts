import express from "express";
import { createRoom, getRooms } from "../controllers/RoomsController";

const router = express.Router();

router.get("/lists", getRooms);
router.post("/create", createRoom);

export default router;
