import { signup, login , editUser, addToCart, removeFromCart, getCartData} from "../../controllers/users/user.controller.js";
import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/edit", editUser);
router.post("/add-cart", verifyToken, addToCart);
router.delete("/remove-cart", verifyToken, removeFromCart);
router.get("/get-cart-data" , verifyToken, getCartData);


export default router;