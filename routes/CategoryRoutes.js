const express = require('express');
const auth = require('../middleware/auth');
const { getCategory, PostCategory, PatchCategory, Deletecategory, getCategoryById, getSubCategoryForCategory } = require('../controllers/categoryController');
const CategoryRouter = express.Router();


CategoryRouter.post('/category', auth, PostCategory)
// CategoryRouter.get('/category', auth, getCategory)
CategoryRouter.get('/category', getCategory)
CategoryRouter.get('/category/:id', auth, getCategoryById)
CategoryRouter.get('/category/:CatId/subCategory', getSubCategoryForCategory)
// CategoryRouter.get('/category/:CatId/subCategory', auth, getSubCategoryForCategory)
CategoryRouter.patch('/category/:id', auth, PatchCategory)
CategoryRouter.delete('/category/:id', auth, Deletecategory)

module.exports = CategoryRouter