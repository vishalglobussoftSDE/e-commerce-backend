import { signup, login } from "../../controllers/users/user.controller.js";
import { Router } from "express";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;

