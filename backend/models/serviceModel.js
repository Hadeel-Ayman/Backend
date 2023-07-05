const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    imgCover: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const ServiceModel = mongoose.model('Service', ServiceSchema)
module.exports = ServiceModel