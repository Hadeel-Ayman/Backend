const express = require('express');
const { postConversation, getSingleConversation, findChat } = require('../controllers/conversationController.js');
const conversationRouter = express.Router();

conversationRouter.post('/conversation', postConversation)
conversationRouter.get('/conversation/:id', getSingleConversation)
conversationRouter.get('/conversation/:firstId/:secondId', findChat)

module.exports = conversationRouter