import multer from "multer";
import { login, refresh, register,logout } from "../controllers/AuthController";

const router = require("express").Router();
const upload = multer({ dest: "uploads/" });

router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);


export default router;
