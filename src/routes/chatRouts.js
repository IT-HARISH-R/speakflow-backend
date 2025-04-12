import express from 'express'

import chatController from "../controllers/chatControllers.js";

const chatRouts = express.Router();

chatRouts.post('/chat',chatController.chatRes);


export default chatRouts