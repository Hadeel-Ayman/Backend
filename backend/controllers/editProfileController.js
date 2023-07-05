const Profile = require("../models/profileModel")

const getProfileById = async (req, res) => {
    const _id = req.params.id
    try {
        const userData = await Profile.findById({ _id })
        if (userData) {
            res.status(200).send(userData)
        } else {
            res.status(400).send('not found')
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

const addProfile = async (req, res) => {
    try {
        const userData = new Profile({
            ...req.body, avatar: req.file.fieldname
        })
        await userData.save()
        res.status(200).send(userData)
    } catch (e) {
        res.status(400).send({ msg: e.message })
    }
}

const editProfile = async (req, res) => {
    const id = req.params.id
    try {
        const userData = await Profile.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            new: true
        })
        if (!userData) {
            return res.status(404).send('userData not found')
        }
        res.status(200).send(userData)
    } catch (e) {
        res.status(200).send(e.message)
    }
}

const deleteProfile = async (req, res) => {
    try {
        const id = req.params.id
        const userData = await Profile.findByIdAndDelete({ _id: id })
        if (!userData) {
            res.status(404).send('userData not found')
        } else {
            res.status(200).send('userData is deleted')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}


const getProfile = async (req, res) => {
    try {
        const userData = await Profile.find()
        if (!userData) {
            res.status(404).send('userData not found')
        } else {
            res.status(200).send(userData)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = {
    getProfile,
    editProfile,
    deleteProfile,
    addProfile,
    getProfileById
}