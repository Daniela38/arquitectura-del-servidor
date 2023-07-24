import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/users.model.js";
import { createHash, isValidPassword } from "../utils/utils.js"
import GitHubStrategy from "passport-github2";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use(
        "register",
        new LocalStrategy(
            {
                usernameField: "email",
                passReqToCallback: true
            },
            async (req, username, password, done) => {
                const { first_name, last_name, email, age } = req.body;
                try{
                    let user = await userModel.findOne({ email: username });
                    if (user) {
                        return done(null, false, {
                            message: "User already exists",
                            status: 409
                        });
                    }
                    const newUser = {
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        age: parseInt(age),
                        password: createHash(password)
                    };
                    user = await userModel.create(newUser);
                    done(null, user);
                } catch (error) {
                    done(null, false, { message: "error", status: 400 });
                }
            }
        )
    );

    passport.use(
        "login",
        new LocalStrategy(
            { usernameField: "email" },
            async (username, password, done) => {
                try {
                    const user = await userModel.findOne({ email: username });
                    if(!user) {
                        return done(null, false, { message: "User not found", status: 404});
                    }
                    if(!isValidPassword(user, password)) {
                        return done(null, false, { message: "Invalid password", status: 401 });
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.af8e4342dc81a540', 
        clientSecret: '3ca495862b9130c1b26e72dd33d02f0808cfbf56',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log({profile});
            let user = await userModel.findOne({email: profile._json.email})
            if(user) {
                return done(null, user)
            }
            const newUser = {
                first_name: profile._json.name,
                last_name: '',
                email: profile._json.email,
                age: 1,
                password: ''
            }
            user = await userModel.create(newUser)
            return done(null, user)
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