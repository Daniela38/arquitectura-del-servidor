import config from '../config/dotenv.config.js';
import { default as token } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { mailConfig } from "../utils/mailer.js";

const register = (req, res) => {
    res.send({ status: "success", message: "User registered", user: req.user});
}

const login = (req, res) => {
    res.cookie("loginCookieToken", req.user, {httpOnly: true}).status(200).send({msg:"Cookie set", jwt: req.user});
}

const sendEmail = (req, res) => {
  try {
      const email = req.params.email;
      const jwt = token.sign({email}, config.privateKey, { expiresIn: '1h' });
      const transport = nodemailer.createTransport(mailConfig);
      transport.sendMail(
          {
              from: config.mailing.USER,
              to: email,
              subject: 'Test',
              html: `<h1>Reset your password</h1>
              <p>Click <a href="http://localhost:8080/resetpassword/${jwt}">here</a> to reset your password</p>`
          }
      )
      res.send('Email sent!')
  } catch (error) {
      throw error;
  }
}

const changeUserRole = (req, res) => {
  try {
    const userId = req.params.uid;
    const newRole = req.body.role;

    if (["user", "admin", "premium"].includes(newRole)) {
      const updateUser = userModel.findByIdAndUpdate(
        userId,
        { role: newRole },
        { new: true }
      );

      if (updateUser) {
        res.status(200).json(updateeUser);
      } else {
        res.status(404).send("User not found");
      }
    }else{
      res.status(400).send("Invalid role");
    }
  } catch (error) {
    req.logger.error(`Interval server error ${error}`)
    res.status(500).send(`Interval server error ${error}`)
  }
}

const current = (req, res) => {
    res.status(200).send(req.user.user);
}

const github = (req, res) => {
};

const githubCallback = (req, res) => {
    res.cookie("loginCookieToken", req.user, {httpOnly: true}).redirect('/products');
}

const logout = (req, res) => {
    req.session.destroy();
    res.send({status: 1, message: "Successfully logout"})
}

export default {
    register,
    login,
    sendEmail,
    current,
    github,
    githubCallback,
    logout
}