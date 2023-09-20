import UsersModel from "../models/users.model.js";

class UserMongoManager {

    constructor() {
        this.usersModel = UsersModel;
    }

    getUserByEmail = async (email) => {
        try {
            const user = await this.usersModel.findOne({ email: email });
            return user;
        } catch (error) {
            throw error;
        }
    }

    updateUser = async (userId, updatedFields) => {
        try {

        } catch (error) {
            throw error;
        }
    }
}

export default UserMongoManager;