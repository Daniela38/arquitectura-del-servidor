export default class UsersRepository {

    constructor(dao) {
        this.dao = dao;
    }

    getUserByEmail = async (email) => {
        const user = await this.dao.getUserByEmail(email);
        return user;
    }
}