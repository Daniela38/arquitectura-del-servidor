import nodemailer from 'nodemailer';
import config from '../config/dotenv.config.js';
import { default as token } from 'jsonwebtoken';

export const sendEmail = async (email) => {
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
        await transport.sendMail(
            {
                from: config.mailing.USER,
                to: email,
                subject: 'Test',
                html: `<h1>Reset your password</h1>
                <p>Clicl <a href="${resetUrl}">here</a> to reset your password</p>`
            }
        )
    } catch (error) {
        throw error;
    }
}