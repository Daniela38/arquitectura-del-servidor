import mongoose from "mongoose";

export const ticketsCollection = 'tickets'

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchaseDatetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

const TicketsModel = mongoose.model(ticketsCollection, ticketSchema);

export default TicketsModel;