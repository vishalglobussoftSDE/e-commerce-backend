import { createProduct, getAllProducts ,createAllProduct} from "../../controllers/products/product.controller.js";
import upload from '../../middlewares/upload.js';
import allupload from '../../middlewares/allUpload.js';
import { Router } from "express";

const router = Router();

router.post("/create", upload.single('image') ,createProduct);
router.post("/allcreate", allupload.single('image') ,createAllProduct);
router.get("/all", getAllProducts);

export default router;