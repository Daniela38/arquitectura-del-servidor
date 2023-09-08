import dotenv from 'dotenv';

dotenv.config();

export default {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    dbUrl: process.env.DB_URL,
    privateKey: process.env.PRIVATE_KEY,
    persistence: process.env.PERSISTENCE
};