import MessagesRepository from "../repositories/messages.repository.js";

class MessagesService {
    constructor() {
        this.MessagesRepository = new MessagesRepository();
    }

    getMessages = async () => {
        try {
            const messages = await this.MessagesRepository.getMessages();
            return messages
        } catch (error) {
            throw new Error
        }
    }

    addMessage = async (user, message) => {
        try {
            if(!user) {
                throw new Error('User is required');
            }
            if (!user.includes('@')) {
                throw new Error('User must be an email');
            }
            if (!message) {
                throw new Error('Message is required');
            }
            if (message.length === 0) {
                throw new Error('Message is required');
            }
            if (message.lenght > 280) {
                throw new Error('Message cannot be longer than 280 characters');
            }
            const newMessage = await this.MessagesRepository.addMessage(user, message);
            return newMessage
        } catch (error) {
            throw new Error;
        }
    }
}

export default MessagesService;