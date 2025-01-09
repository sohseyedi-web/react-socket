import multer from "multer";
import { login, refresh, register } from "../controllers/AuthController";

const router = require("express").Router();
const upload = multer({ dest: "uploads/" });

router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);
router.post("/refresh", refresh);


export default router;
