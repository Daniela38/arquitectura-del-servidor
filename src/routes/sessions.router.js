import cookieParser from 'cookie-parser';
import { Router } from 'express';
//import userModel from '../dao/models/users.model.js';
import passport from 'passport';
import config from '../config/dotenv.config.js';
import { validateResetPasswordToken } from '../utils/utils.js';
import sessionsController from '../controllers/sessions.controller.js';
import nodemailer from 'nodemailer';

const router = Router();
router.use(cookieParser(config.privateKey));

router.post('/register', passport.authenticate('register', { session: false}), sessionsController.register);
router.post('/login', passport.authenticate('login', { session:false }), sessionsController.login);
router.get('/resetpassword/:email', sessionsController.sendEmail);
router.post('/resetpasswordvalidation/:token', sessionsController.resetPassword);
router.post('/premium/:uid', sessionsController.changeUserRole);
/*router.get('/resetpasswordvalidation/:token', validateResetPasswordToken, (req, res) => {
    res.redirect(`/resetpassword/${req.params.token}`);   , validateResetPasswordToken,
});*/
router.get('/current', passport.authenticate('current', { session: false }), sessionsController.current);
router.get('/github', passport.authenticate('github', { scope: ['user: email' ] }), sessionsController.github);
router.get('/githubcallback', passport.authenticate('github'), sessionsController.githubCallback);
router.post('/logout', sessionsController.logout);

/*router.post('/register', passport.authenticate('register', { session: false}), async (req, res) => {
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age,
        rol: req.userRole
    }
    res.send({ status: "success", message: "User registered" });
});*/

/*router.get('/failregister', (req, res) => {
    res.status(400).send({ status: "error", error: "Sign up failed" });
});*/

/*router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
    const user = {
        first_name,
        last_name,
        email,
        age,
        password 
    }
    await userModel.create(user);
    res.send({ status: "success", message: "User registered" });
})*/

//router.post('/login', passport.authenticate('login', { session:false }), async (req, res) => {
    /*let userRole = false;
    if(req.user.email.includes("admin")) {
        userRole= true;
    }*/
    /*req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age,
        rol: req.userRole
    }*/
    //res.send({ status: "success", payload: req.session.user, message: "Successfully login" });
    //res.cookie("loginCookieToken", req.user, {httpOnly: true}).status(200).send("Cookie set")
//});

/*router.get('/faillogin', (req, res) => {
    res.status(400).send({ status: "error", error: "Login failed" });
});*/

/*router.post('/resetpassword', passport.authenticate('resetPassword', { failureRedirect: '/api/sessions/failreset' }), async (req, res) => {
    res.send({ status: 1, msg: 'Password reset'});
});*/

/*router.get('/failreset', (req, res) => {
    res.status(400).send({ status: "error", error: 'Reset password failed'});
});*/

/*router.post('/login', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const userEmail = await userModel.findOne({ email });
    if (!userEmail) return res.status(400).send({ status: "error", error: "User does not exists" });
    if (user.password !== password) {
        return res.status(400).send({ status: "error", error: "User exists but password is incorrect" });
    }
    if (user) {
        let userRole = false;
        if (email.includes("admin")) {
            userRole = true;
        }
    }
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        rol: userRole
    }

    res.send({ status: "success", payload: req.session.user, message: "Successfully login" });
})*/

/*router.get('/current', passport.authenticate("current", { session: false }), (req,res) => {
    if(req.user) {
        res.status(200).send(req.user.user)
    } else {
        res.status(400).send('Fail to bring user')
    }
})*/

//router.get('/github', passport.authenticate('github', { scope: ['user: email' ] }), async (req, res) => { });

/*router.get('/githubcallback', passport.authenticate('github', { session: false }), async (req, res) => {
    //req.session.user = req.user;
    res.cookie("loginCookieToken", req.user, {httpOnly: true}).redirect('/products');
    //res.redirect('/products');
});*/

/*router.post('/logout', (req, res) => {
    req.session.destroy();
    res.send({status: 1, message: "Successfully logout"})
});*/

export default router;