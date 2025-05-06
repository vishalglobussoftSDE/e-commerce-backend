import { createProduct, getAllProducts } from "../../controllers/products/product.controller.js";
import upload from '../../middlewares/upload.js'
import { Router } from "express";

const router = Router();

router.post("/create", upload.single('image') ,createProduct);
router.get("/all", getAllProducts);

export default router;