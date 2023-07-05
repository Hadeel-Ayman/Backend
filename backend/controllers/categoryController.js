const Category = require("../models/categoryModel")
const Subcategory = require("../models/subCategoryModel")

const getCategory = async (req, res) => {
    try {
        const category = await Category.find({})
        res.status(200).send(category)
    } catch (e) {
        res.status(400).send({ msg: e.message })
    }
}

const PostCategory = async (req, res) => {
    try {
        const category = new Category(req.body)
        await category.save()
        res.status(200).send(category)
    } catch (e) {
        res.status(400).send({ msg: e.message })
    }
}


const PatchCategory = async (req, res) => {
    const id = req.params.id
    try {
        const category = await Category.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            new: true
        })
        if (!category) {
            return res.status(404).send('category not found')
        }
        return res.status(200).send(category)
    } catch (e) {
        return res.status(200).send(e)
    }
}

const Deletecategory = async (req, res) => {
    try {
        const id = req.params.id
        const category = await Category.findByIdAndDelete({ _id: id })
        if (!category) {
            res.status(404).send('category not found')
        } else {
            res.status(200).send('category is deleted')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).send({ error: 'Category not found' });
        } else {
            return res.status(200).send(category);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const getSubCategoryForCategory = async (req, res) => {
    try {
        const { CatId } = req.params
        if (!CatId) {
            return res.status(400).json({ error: "Invalid category ID" });
        }
        const subcategories = await Subcategory.find({ category: CatId });
        res.status(200).send(subcategories);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = {
    getCategory,
    PostCategory,
    PatchCategory,
    Deletecategory,
    getCategoryById,
    getSubCategoryForCategory
}