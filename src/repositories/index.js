import { CartsDaoFactory, MessagesDaoFactory, ProductsDaoFactory, TicketsDaoFactory } from "../dao/factory.js";
import ProductsRepository from "./products.repository.js";
import MessagesRepository from "./messages.repository.js";
import CartsRepository from "./carts.repository";
import TicketsRepository from "./tickets.repository.js";

const cartsManager = CartsDaoFactory.getDao();
const messagesManager = MessagesDaoFactory.getDao();
const productsManager = ProductsDaoFactory.getDao();
const ticketsManager = TicketsDaoFactory.getDao();

export const cartsRepository = new CartsRepository(cartsManager);
export const messagesRepository = new MessagesRepository(messagesManager);
export const productsRepository = new ProductsRepository(productsManager);
export const ticketsRepository = new TicketsRepository(ticketsManager);