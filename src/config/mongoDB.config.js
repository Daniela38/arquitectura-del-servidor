import mongoose from 'mongoose';
import config from './dotenv.config.js';

export default function configureMongo(){
    mongoose.connect(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((conn) =>{
        console.log('Connected');
    }).catch((err) => {
        console.log('Error');
    });
}