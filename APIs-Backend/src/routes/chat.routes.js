"use strict"
import { Router } from 'express';
import { addMessage, getMessages } from '../controllers/chat.controller.js';
import { validateMessage } from '../validators/chat.validators.js';

const chatRouter = Router();

chatRouter.post("/addMessage", validateMessage ,addMessage);
chatRouter.post("/getMessages", getMessages);

export default chatRouter;