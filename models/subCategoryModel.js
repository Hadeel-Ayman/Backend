const mongoose = require('mongoose')


const SubcategorySchema = new mongoose.Schema({
    sub_category: {
        type: String,
        required: true,
        unique: [true, 'SubCategory should be unique']
    },
    imgCover: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
})

const Subcategory = mongoose.model('Subcategory', SubcategorySchema)
module.exports = Subcategory
