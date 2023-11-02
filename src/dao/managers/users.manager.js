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

    checkInactivity = async (inactivity) => {
        const checkUsers = await this.usersModel.updateMany({last_connection: { $lt: inactivity }});
        return checkUsers;
    }

    deleteUser = async (email) => {
        const user = await this.usersModel.deleteOne({ email });
        return user;
    }

    delete = async (deletedUsers) => {
        const users = await this.usersModel.deleteMany({ last_connection: { $lt: deletedUsers }});
    }

    changeRole = async (email, newRole) => {
        const user = await this.usersModel.findOne({ email })
        if(!user) {
            throw new Error('User not found')
        }
        if(user.role === newRole) {
            throw new Error('This user already has that role')
        }
        const updatedRole = await this.usersModel.updateOne(
            { email: email }, 
            { $set: { role: newRole} } );
            if (updatedRole.modifiedCount > 0) {
                return newRole;
            } else {
                return user;
            }
            return role;
    }
}

export default UserMongoManager;