const jwt = require('jsonwebtoken')
const Auth = require('../models/authModel')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const decode = jwt.verify(token, 'SECRET_KEY')
        console.log(decode)

        const user = await Auth.findOne({ _id: decode._id.toString(), tokens: token })
        console.log(user)
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (e) {
        res.status(401).send({ error: 'authentication please' })
    }
}

module.exports = auth