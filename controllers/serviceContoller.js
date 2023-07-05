const Service = require('../models/serviceModel')


//postService
const postService = async (req, res) => {
    try {
        const service = new Service({ ...req.body, owner: req.user._id, avatar: req.file.fieldname })
        await service.save()
        res.status(200).send(service)
    } catch (e) {
        res.status(400).send({ msg: e.message })
    }
}

//getService
const getService = async (req, res) => {
    try {
        const sevice = await Service.find({}).populate({ path: 'subcategory', select: 'sub_category -_id' })
        res.status(200).send(sevice)
    } catch (e) {
        res.status(400).send({ msg: e.message })
    }
}

// getServiceById
const getServiceById = async (req, res) => {
    try {
        const id = req.params.id
        const service = await Service.findOne({ _id: id, owner: req.user._id })
            .populate({ path: 'subcategory', select: 'sub_category -_id' });

        if (!service) {
            return res.status(404).send({ error: 'service not found' })
        } else {
            return res.status(200).send(service)
        }

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

//patchService
const patchService = async (req, res) => {
    try {
        const id = req.params.id
        const service = await Service.findOneAndUpdate({ _id: id, owner: req.user._id }, req.body, {
            runValidators: true,
            new: true
        })
        if (!service) {
            return res.status(404).send('service not found')
        }
        res.status(200).send(service)
    } catch (e) {
        res.status(500).send(e.message)
    }
}


//deleteService
const deleteService = async (req, res) => {
    try {
        const id = req.params.id
        const service = await Service.findByIdAndDelete({ _id: id })
        if (!service) {
            res.status(404).send('service not found')
        } else {
            res.status(200).send('service is deleted')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = {
    postService,
    getService,
    getServiceById,
    patchService,
    deleteService,
}
