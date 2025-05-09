import { signup, login , editUser, addToCart, removeFromCart, getCartData, placeOrder, getUser} from "../../controllers/users/user.controller.js";
import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/edit", editUser);
router.post("/add-cart", verifyToken, addToCart);
router.delete("/remove-cart", verifyToken, removeFromCart);
router.get("/get-cart-data" , verifyToken, getCartData);
router.post("/place-order", verifyToken, placeOrder);
router.get("/getuser", getUser);
// router.get("/get-orders", verifyToken, getOrders);

export default router;