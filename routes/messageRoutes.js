const express = require('express');
const { postMessage, getMessage } = require('../controllers/messageController');
const messageRouter = express.Router();

messageRouter.post('/message', postMessage)
messageRouter.get('/message/:conversationId', getMessage)

module.exports = messageRouter