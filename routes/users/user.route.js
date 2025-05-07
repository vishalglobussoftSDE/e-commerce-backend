import { signup, login , editUser} from "../../controllers/users/user.controller.js";
import { Router } from "express";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/edit", editUser);

export default router;

