const express = require('express');
const { getProfile, editProfile, deleteProfile, addProfile, getProfileById } = require('../controllers/editProfileController');
const profileRoute = express.Router();
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const date = Date.now() + '-' + file.originalname
        cb(null, file.fieldname + '-' + date)
    }
})

const upload = multer({ storage: storage }).single('avatar');


profileRoute.get('/Profile', getProfile)
profileRoute.post('/Profile', upload, addProfile)
profileRoute.patch('/Profile/:id', upload, editProfile)
profileRoute.get('/Profile/:id', getProfileById)
profileRoute.delete('/Profile/:id', deleteProfile)


module.exports = profileRoute