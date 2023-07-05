const express = require('express');
const auth = require('../middleware/auth');
const { getSubCategory, PostSubCategory, PatchSubCategory, DeleteSubCategory, getSubCategoryById, getProductFromSubCate, getServiceFromSubCate } = require('../controllers/SubcategoryController');
const SubcategoryRouter = express.Router({ mergeParams: true });

SubcategoryRouter.get('/subCategory', getSubCategory)
SubcategoryRouter.post('/subCategory', auth, PostSubCategory)
SubcategoryRouter.patch('/subCategory/:id', auth, PatchSubCategory)
SubcategoryRouter.delete('/subCategory/:id', auth, DeleteSubCategory)
SubcategoryRouter.get('/subCategory/:id', auth, getSubCategoryById)
SubcategoryRouter.get('/subCategory/:subCatId/service', getServiceFromSubCate)

module.exports = SubcategoryRouter
