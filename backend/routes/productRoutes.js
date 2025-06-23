import express from "express";
import formidable from "express-formidable";

const router = express.Router()

import { addProduct, updateProductDetails, deleteProduct, fetchProducts, fetchProductById, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts } from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from '../middlewares/checkId.js'

router.route('/').get(fetchProducts).post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route('/allproducts').get(fetchAllProducts)
router.route('/:id/reviews').post(authenticate, authorizeAdmin, checkId ,  addProductReview)
router.get('/top', fetchTopProducts)
router.get('/new', fetchNewProducts)

router.route('/:id').put(authenticate, authorizeAdmin, formidable(), updateProductDetails);

router.route('/:id').delete(authenticate,authorizeAdmin, formidable(), deleteProduct);

router.route('/:id').get(fetchProductById)


export default router;