const express = require('express');
const router = express.Router();
const productController = require('../controllers/productCt');

router.get('/featured-products', productController.getFeaturedProducts);
router.post('/', productController.addProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/slug/:slug', productController.getProductBySlug);
router.get('/category/:categoryId', productController.getProductsByCategory);
router.get('/category/slug/:categorySlug', productController.getProductsByCategorySlug);

module.exports = router;