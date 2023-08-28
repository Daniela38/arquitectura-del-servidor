import {fileURLToPath} from 'url';
import { dirname } from 'path';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/dotenv.config.js';

//bcrypt
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

//Token
export const generateToken = (user) => {
    const token = jwt.sign({ user }, config.privateKey, { expiresIn: '1d' });
    return token;
}

//Cookie Extraxtor
export const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        return token = req?.cookies['loginCookieToken']
    }
    return token
};

//Authorization
export const checkUser = (req, res, next) => {
    const role = req.user.role;
    if ( role === "user" ) {
        next();
    } else {
        res.status(401).send('Error: you do not have permissions to perform this action');
    }
}



//JWT Verify
export const jwtVerify = (token) => {
    try{
        const token = jwt.verify(token, config.privateKey);
        return token
    } catch (error) {
        return false
    }
};

//authToken
export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ status: "error", error: "Unauthorized" })
    const token = authHeader.split(' ')[1];
    jwt.verify(token, config.privateKey, (error, credentials) => {
        if (error) return res.status(401).send({ status: "error", error: "Unauthorized" })
        req.user = credentials.user;
        next();
    })
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(dirname(__filename), `../`);

export default __dirname;