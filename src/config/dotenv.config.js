import dotenv from 'dotenv';

dotenv.config();

export default {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    dbUrl: process.env.DB_URL,
    privateKey: process.env.PRIVATE_KEY,
    persistence: process.env.PERSISTENCE,
    mailing: {
        SERVICE: process.env.MAILING_SERVICE,
        PORT: process.env.MAILING_PORT,
        USER: process.env.MAILING_USER,
        PASSWORD: process.env.MAILING_PASSWORD
    }
};