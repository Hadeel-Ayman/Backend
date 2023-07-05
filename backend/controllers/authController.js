
const Auth = require("../models/authModel")

// register
const register = async (req, res) => {
    try {
        const user = new Auth(req.body)
        const token = await user.generateToken()
        await user.save()
        res.status(200).send([user, token])
    } catch (e) {
        res.status(400).send(e)
    }
}


// login
const login = async (req, res) => {
    try {
        const user = await Auth.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.status(200).send([user, token])
    } catch (e) {
        res.status(400).send(e.message)
    }
}


// logout
const logout = async (req, res) => {
    try {
        console.log(req.user)
        req.user.tokens = req.user.tokens.filter((el) => {
            return el !== req.token
        })

        await req.user.save()
        res.status(200).send('you are logout')
    } catch (e) {
        res.status(400).send(e)
    }
}



module.exports = {
    register,
    login,
    logout
}