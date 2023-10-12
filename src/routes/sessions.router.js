import cookieParser from 'cookie-parser';
import { Router } from 'express';
//import userModel from '../dao/models/users.model.js';
import passport from 'passport';
import config from '../config/dotenv.config.js';
import { validateResetPasswordToken } from '../utils/utils.js';
import sessionsController from '../controllers/sessions.controller.js';
import nodemailer from 'nodemailer';
import uploader from '../utils/multer.js';
import { createDocuments } from '../controllers/sessions.controller.js';


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
router.post("/:uid/documents", uploader('documents').array('documents'), createDocuments)

export default router;