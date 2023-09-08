import mongoose from 'mongoose';
import config from './dotenv.config.js';
import { loggerInfo } from '../utils/logger.js';

export default function configureMongo(){
    mongoose.connect(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((conn) =>{
        const info = loggerInfo();
        info.info('Connected with mongoDB');
    }).catch((err) => {
        const info = loggerInfo();
        info.info('Error');
    });
}