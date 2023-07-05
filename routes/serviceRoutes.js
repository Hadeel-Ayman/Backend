const express = require('express');
const { postService, getService, getServiceById, patchService, deleteService } = require('../controllers/serviceContoller');
const auth = require('../middleware/auth');
const multer = require('multer');
const serviceRouter = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/service')
    },
    filename: function (req, file, cb) {
        const date = Date.now() + '-' + file.originalname
        cb(null, file.fieldname + '-' + date)
    }
})

const upload = multer({ storage: storage }).single('avatar');


serviceRouter.post('/service', auth, upload, postService)
serviceRouter.get('/service', auth, getService)
// serviceRouter.get('/getService', getService)
serviceRouter.get('/service/:id', auth, getServiceById)
serviceRouter.patch('/service/:id', auth, upload, patchService)
serviceRouter.delete('/service/:id', auth, deleteService)


module.exports = serviceRouter

