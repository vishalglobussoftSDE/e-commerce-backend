import { signup, login , edit} from "../../controllers/users/user.controller.js";
import { Router } from "express";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/edit", edit);

export default router;

