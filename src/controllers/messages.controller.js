import MessagesService from "../services/messages.service.js";

const messagesService = new MessagesService();

const getMessages = async (req, res) => {
    try {
        const messages = await this.messagesService.getMessages();
        res.send({status: 1, messages: messages});
    } catch (error) {
        res.status(500).send({status: 0, msg: error.message});
    }
}

const postMessage = async (req, res) => {
    try {
        const { user, message } = req.body;
        const newMessage = await messagesService.addMessage(user, message);
        res.send({status: 1, msg: 'Message added succesfully', message: newMessage});
    } catch (error) {
        res.status(500). send({status: 0, msg: error.message});
    }
}

export default { getMessages, postMessage };