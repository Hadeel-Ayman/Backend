const Product = require("../models/productCategModel");

const getProductCategory = async (req, res) => {
    try {
        const product = await Product.find({}).populate({ path: 'subcategory', select: 'sub_category -_id' })
        res.status(400).send(product)
    } catch (e) {
        res.status(400).send({ msg: e.message })
    }
}

const PostProductCategory = async (req, res) => {
    try {
        const product = new Product(req.body)
        await product.save()
        res.status(200).send(product)
    } catch (e) {
        res.status(400).send({ msg: e.message })
    }
}

const PatchProductCategory = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            new: true
        })
        if (!product) {
            return res.status(404).send('product not found')
        }
        res.status(200).send(product)
    } catch (e) {
        res.status(200).send(e.message)
    }
}

const DeleteProductCategory = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findByIdAndDelete({ _id: id })
        if (!product) {
            res.status(404).send('product not found')
        } else {
            res.status(200).send('product is deleted')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getProductCategoryById = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id).populate({ path: 'subcategory', select: 'sub_category -_id' });
        if (!product) {
            return res.status(404).json({ error: 'product not found' });
        } else {
            return res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getProductCategory,
    PostProductCategory,
    PatchProductCategory,
    DeleteProductCategory,
    getProductCategoryById
}