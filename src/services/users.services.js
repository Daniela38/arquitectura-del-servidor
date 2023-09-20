import { usersRepository } from "../repositories/index.js";
import config from '../config/dotenv.config.js';
import { default as token } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { sendEmail } from "../utils/mailer.js";

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

    createEmailJwt = (email) => {
        const jwt = token.sign({email}, config.privateKey, { expiresIn: '1h' });
        return jwt;
    }

    sendEmail = (req, res) => {
        try {
            const mailConfig = {
                service: config.mailing.SERVICE,
                port: config.mailing.PORT,
                auth:{
                    user: config.mailing.USER,
                    password: config.mailing.PASSWORD
                }
            };
            const transport = nodemailer.createTransport(mailConfig);
            transport.sendMail(
                {
                    from: config.mailing.USER,
                    to: email,
                    subject: 'Test',
                    html: `<h1>Reset your password</h1>
                    <p>Clicl <a href="http://localhost:8080/resetpassword/${jwt}">here</a> to reset your password</p>`
                }
            )
            res.send('Email send!')
        } catch (error) {
            throw error;
        }
    }

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