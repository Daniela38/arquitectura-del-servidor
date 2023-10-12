import passport from "passport";
import jwt from 'passport-jwt';
import local from "passport-local";
import userModel from "../dao/models/users.model.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import { default as token } from 'jsonwebtoken';
import { generateToken, cookieExtractor, authToken } from "../utils/utils.js";
import GitHubStrategy from "passport-github2";
import config from "./dotenv.config.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('current', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: config.privateKey
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            done(error)
        }
    }
    ));

    passport.use("register", new LocalStrategy({usernameField: "email", passReqToCallback: true}, async (req, username, password, done) => {
                const { first_name, last_name, email, age, role } = req.body;
                try{
                    let user = await userModel.findOne({ email: username });
                    if (user) {
                        return done(null, false, {message: "User already exists"});
                    }
                    const newUser = {
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        age: parseInt(age),
                        password: createHash(password),
                        role: role,
                        last_connection: new Date()
                    };
                    user = await userModel.create(newUser);
                    return done(null, user);
                } catch (error) {
                    done(null, false, { message: "error", status: 400 });
                }
            }
        )
    );

    passport.use("login", new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async (req, username, password, done) => {
                try {
                    const user = await userModel.findOne({ email: username });
                    if(!user) return done(null, false, { message: "User not found", status: 404});
                    if(!isValidPassword(user, password)) return done(null, false, { message: "Invalid password", status: 401 });
                    const { password: pass, ...userNoPass } = user._doc;
                    const jwt = generateToken(userNoPass);
                    return done(null, jwt);
                } catch (error) {
                    return done(error);
                }
            })
    );

    passport.use('resetPassword', new LocalStrategy({
        usernameField: 'emai',
        passwordField: 'newPassword',
        passReqToCallback: true,
    }, async (password, done) => {
        try {
            const user = await userModel.findOne({ email });
            const newHashedPassword = createHash(password);
            await userModel.updateOne({_id: user._id}, {$set: {password: newHashedPassword}});
            return done (null, user);
        } catch (error) {
            errorMsg = error.message;
            return done (errorMsg);
        }
    } 
    ));

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.af8e4342dc81a540', 
        clientSecret: '3ca495862b9130c1b26e72dd33d02f0808cfbf56',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({email: profile._json.email})
            if(!user) {
                user = {
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email,
                    age: 1,
                    password: ''
                }
                user = await userModel.create(user)
            }
            const { password: pass, ...userNoPass } = user._doc;
            const jwt = generateToken(userNoPass);
            return done(null, jwt)
        } catch (error) {
            return done({ message: 'Error creating user' });
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (_id, done) => {
        try {
            const user = await userModel.findOne({ _id });
            return done(null, user);
        } catch {
            return done({message: "Error deserializing user"});
        }
    });
};

export default initializePassport;