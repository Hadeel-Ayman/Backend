const Subcategory = require("../models/subCategoryModel")
const Service = require('../models/serviceModel')
const getSubCategory = async (req, res) => {
    console.log(req.params.CatId)
    try {
        const category = await Subcategory
            .find({})
            .populate({ path: 'category', select: 'category -_id' })
        res.status(200).send(category)
    } catch (e) {
        res.status(400).send({ msg: e.message })
    }
}

const PostSubCategory = async (req, res) => {
    try {
        const subcategory = new Subcategory(req.body)
        await subcategory.save()
        res.status(200).send(subcategory)
    } catch (e) {
        res.status(400).send({ msg: e.message })
    }
}

const PatchSubCategory = async (req, res) => {
    const id = req.params.id
    try {
        const subcategory = await Subcategory.findOneAndUpdate(id, req.body, {
            runValidators: true,
            new: true
        })
        if (!subcategory) {
            return res.status(404).send('subcategory not found')
        }
        res.status(200).send(subcategory)
    } catch (e) {
        res.status(200).send(e.message)
    }
}

const DeleteSubCategory = async (req, res) => {
    try {
        const id = req.params.id
        const subcategory = await Subcategory.findByIdAndDelete({ _id: id })
        if (!subcategory) {
            res.status(404).send('subcategory not found')
        } else {
            res.status(200).send('subcategory is deleted')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getSubCategoryById = async (req, res) => {
    try {
        const id = req.params.id
        const category = await Subcategory
            .findById(id)
            .populate({ path: 'category', select: 'category -_id' });
        if (!category) {
            return res.status(404).send({ error: 'Category not found' });
        } else {
            return res.status(200).send(category);
        }
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


const getServiceFromSubCate = async (req, res) => {
    try {
        const products = await Service.find({ subcategory: req.params.subCatId });
        res.status(200).send(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getSubCategory,
    PostSubCategory,
    PatchSubCategory,
    DeleteSubCategory,
    getSubCategoryById,
    getServiceFromSubCate
}