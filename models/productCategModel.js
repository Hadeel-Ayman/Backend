const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    images: {
        type: Array,
        required: true
    }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product
