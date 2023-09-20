import DbProductManager from "./managers/DBProductManager.js";
import DbCartManager from "./managers/DBCartManager.js";
import MessagesManager from "./managers/MessagesManager.js";
import TicketManager from "./managers/TicketsManager.js";
import UserMongoManager from "./managers/users.manager.js";
import config from '../config/dotenv.config.js';

export class ProductsDaoFactory {
    static getDao() {
        switch (config.persistence) {
            case 'MONGODB':
                return new DbProductManager();
            default:
                return new DbProductManager();
        }
    }
}

export class CartsDaoFactory {
    static getDao() {
        switch (config.persistence) {
            case 'MONGODB':
                return new DbCartManager();
            default:
                return new DbCartManager();
        }
    }
}

export class MessagesDaoFactory {
    static getDao() {
        switch (config.persistence) {
            case 'MONGODB':
                return new MessagesManager();
            default:
                return new MessagesManager();
        }
    }
}

export class TicketsDaoFactory {
    static getDao() {
        switch (config.persistence) {
            case 'MONGODB':
                return new TicketManager();
            default:
                return new TicketManager();
        }
    }
}

export class UsersDaoFactory {
    static getDao() {
        switch (config.persistence) {
            case 'MONGODB':
                return new UserMongoManager();
            default:
                return new UserMongoManager();
        }
    }
}