import { usersRepository } from "../repositories/index.js";

export default class UserService {
    constructor() {
        this.userRepository = usersRepository;
    }

    getUserByEmail = async (email) => {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            return user;
        } catch (error) {
            throw error;
        }
    }

    

    /*createEmailJwt = (email) => {
        const jwt = token.sign({email}, config.privateKey, { expiresIn: '1h' });
        return jwt;
    }*/


    /*createResetPassword = async (email) => {
        try{
            const user = await this.userRepository.getUserByEmail(email);
            const jwt = this.createEmailJwt(email);
            const resetUrl = `localhost:8080/api/sessions/resetpasswordvalidation/${jwt}`;
            await sendEmail(email, 'Reset password', `<h1>Reset your password</h1>
            <p>Clicl <a href="${resetUrl}">here</a> to reset your password</p>`);
            return user;
        } catch(error) {
            throw error;
        }
    }*/
}