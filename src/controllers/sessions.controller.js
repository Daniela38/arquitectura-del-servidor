import UserService from "../services/users.services.js";

const userService = new UserService();

const register = (req, res) => {
    res.send({ status: "success", message: "User registered", user: req.user});
}

const login = (req, res) => {
    res.cookie("loginCookieToken", req.user, {httpOnly: true}).status(200).send({msg:"Cookie set", jwt: req.user});
}

const resetPassword = async (req, res) => {
    try{
        const { email } = req.body;
        const user = await userService.sendEmail(email);
        res.send({ status: 1, msg: 'Password reset'});
    } catch(error) {
        throw error;
    }
}

const current = (req, res) => {
    res.status(200).send(req.user.user);
}

export const changeUserRole = (req, res) => {
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
    resetPassword,
    current,
    github,
    githubCallback,
    logout
}