import {fileURLToPath} from 'url';
import { dirname } from 'path';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const PRIVATE_KEY = "loginToken";

//bcrypt
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

//Token
export const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '1d' });
    return token;
}

//authToken
export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ status: "error", error: "Unauthorized" })
    const token = authHeader.split(' ')[1];
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(401).send({ status: "error", error: "Unauthorized" })
        req.user = credentials.user;
        next();
    })
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(dirname(__filename), `../`);

export default __dirname;