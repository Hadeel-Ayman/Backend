const mongoose = require('mongoose')
const validator = require('validator')

const ProfileSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    age: {
        type: Number,
        trim: true,
        required: true,
        default: 18,
        validate(val) {
            if (val <= 0) {
                throw new Error('age must be positaive')
            }
        }
    },
    country: {
        type: String,
        trim: true
    },
    email: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Auth'
    },
    gender: {
        type: String,
        trim: true
    },
    avatar: {
        type: String
    }
},
    {
        timestamps: true
    })

const Profile = mongoose.model('Profile', ProfileSchema)
module.exports = Profile