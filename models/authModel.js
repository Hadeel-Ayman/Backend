const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 8,
        validate(pass) {
            const myRe = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])")
            if (!myRe.test(pass)) {
                throw new Error('password must contain uppercase , lowercase , numbers, special character')
            }
        }
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Invalid email')
            }
        }
    },
    tokens: [
        {
            type: String,
            required: true
        }
    ]
},
    {
        timestamps: true
    })


// bcryptjs password for regestier

AuthSchema.pre('save', async function () {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 10)
    }
})

//login
AuthSchema.statics.findByCredentials = async (emaicl, pass) => {
    const user = await Auth.findOne({ email: emaicl })

    if (!user) {
        throw Error('Unable to login ccc')
    }

    const PasswordMatch = await bcryptjs.compare(pass, user.password)
    if (!PasswordMatch) {
        throw new Error('Unable to login bbb')
    }
    return user
}

// generateToken
AuthSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign(
        {
            _id: user._id.toString()
        }, 'SECRET_KEY')
    user.tokens = user.tokens.concat(token)
    await user.save()
    return token
}

// hide data
AuthSchema.methods.toJSON = function () {
    const user = this
    const userOfObject = user.toObject()

    delete userOfObject.password
    delete userOfObject.tokens
    return userOfObject
}

const Auth = mongoose.model('Auth', AuthSchema)
module.exports = Auth