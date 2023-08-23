import TicketsRepository from "../repositories/tickets.repository.js";

export default class TicketService {
    constructor() {
        this.ticketsRepository = TicketsRepository;
    }

    ticketFieldsValidation = async (ticket) => {
        try {
            const allowFields = ['amount', 'purchaser'];
            const receivedFields = Object.keys(ticket);
            const isValidOperation = receivedFields.every((field) => allowFields.includes(field));
            if (!isValidOperation) {
                throw new Error('Invalid fields!');
            }
            if (ticket.amount <= 0) {
                throw new Error('Ticket amount must be greater than 0');
            }
            return ticket
        } catch (error) {
            throw error
        }
    }

    createTicket = async (newTicketFields) => {
        try {
            const ticketWithCode = await this.ticketFieldsValidation(newTicketFields);
            const newTicket = await this.ticketsRepository.createTicket(ticketWithCode);
            return newTicket
        } catch (error) {
            throw error
        }
    }
}