import { Router } from "express";
import MessagesManager from "../dao/managers/MessagesManager.js";

const messagesManager = new MessagesManager();

const router = Router();

router.get('/', async (req, res) => {
    try {
        const messages = await messagesManager.getMessages();
        res.send({status: 1, messages: messages});
    } catch (error) {
        res.status(500).send({status: 0, msg: error.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const { user, message } = req.body;
        const newMessage = await messagesManager.addMessage(user, message);
        res.send({status: 1, msg: 'Message added succesfully', message: newMessage});
    } catch (error) {
        res.status(500). send({status: 0, msg: error.message});
    }
});

export default router;