const express = require('express');
const { getProductCategory, PostProductCategory, PatchProductCategory, getProductCategoryById, DeleteProductCategory } = require('../controllers/ProductController');
const ProductRouter = express.Router();
const auth = require('../middleware/auth');

ProductRouter.post('/productCategory', auth, PostProductCategory)
ProductRouter.get('/productCategory', auth, getProductCategory)
ProductRouter.get('/productCategory/:id', auth, getProductCategoryById)
ProductRouter.patch('/productCategory/:id', auth, PatchProductCategory)
ProductRouter.delete('/productCategory/:id', auth, DeleteProductCategory)

module.exports = ProductRouter