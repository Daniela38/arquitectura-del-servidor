import mongoose from 'mongoose';

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Carts", required: false },
    role: { type: String, enum: ["user", "admin", "premium"], default: "premium" },
    last_connection: { type: Date, required: false },
    documents: [ { name: String, reference: String } ],
}) 

const UsersModel = mongoose.model(usersCollection, usersSchema);

export default UsersModel;