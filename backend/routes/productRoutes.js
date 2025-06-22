import express from "express";
import formidable from "express-formidable";

const router = express.Router()

import { addProduct, updateProductDetails, deleteProduct, fetchProducts } from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route('/').get(fetchProducts).post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route('/:id').put(authenticate, authorizeAdmin, formidable(), updateProductDetails);

router.route('/:id').delete(authenticate,authorizeAdmin, formidable(), deleteProduct);

export default router;