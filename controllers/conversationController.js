const Conversation = require("../models/conversationModel")


//postConversation
const postConversation = async (req, res) => {
    try {
        const newConversition = new Conversation({ members: [req.body] })
        await newConversition.save()
        res.status(200).json('done')
    } catch (error) {
        res.status(400).json(error)
    }
}

//getSingleConversation
const getSingleConversation = async (req, res) => {
    try {
        const id = req.params.id
        await Conversation.find({ members: { $in: [id] } }).then((data) => {
            if (!data) {
                res.status(400).send('conversation not found')
            } else {
                res.status(200).send(data)
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

// find chat
const findChat = async (req, res) => {
    try {
        const chat = await Conversation.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] }
        })
        res.status(200).send(chat)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    postConversation,
    getSingleConversation,
    findChat
}