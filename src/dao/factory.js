import DbProductManager from "./managers/DBProductManager.js";
import DbCartManager from "./managers/DBCartManager.js";
import MessagesManager from "./managers/MessagesManager.js";
import TicketManager from "./managers/TicketsManager.js";

export class ProductsDaoFactory {
    static getDao() {
        switch (process.env.PERSISTANCE) {
            case 'MONGODB':
                return new DbProductManager();
            default:
                return new DbProductManager();
        }
    }
}

export class CartsDaoFactory {
    static getDao() {
        switch (process.env.PERSISTANCE) {
            case 'MONGODB':
                return new DbCartManager();
            default:
                return new DbCartManager();
        }
    }
}

export class MessagesDaoFactory {
    static getDao() {
        switch (process.env.PERSISTANCE) {
            case 'MONGODB':
                return new MessagesManager();
            default:
                return new MessagesManager();
        }
    }
}

export class TicketsDaoFactory {
    static getDao() {
        switch (process.env.PERSISTANCE) {
            case 'MONGODB':
                return new TicketManager();
            default:
                return new TicketManager();
        }
    }
}