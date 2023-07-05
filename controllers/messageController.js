const Message = require("../models/messageModel")

// POST Message
const postMessage = async (req, res) => {
    const message = new Message(req.body)
    await message.save()
        .then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            res.status(400).send(err)
        })
}

// GET Message
const getMessage = async (req, res) => {
    const conversationId = req.params.id
    try {
        const result = await Message.find({ conversationId })
        res.status(200).send(result)
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = {
    postMessage,
    getMessage
}