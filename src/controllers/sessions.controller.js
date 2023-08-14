
const register = (req, res) => {
    res.send({ status: "success", message: "User registered" });
}

const login = (req, res) => {
    res.cookie("loginCookieToken", req.user, {httpOnly: true}).status(200).send("Cookie set");
}

const resetPassword = (req, res) => {
    res.send({ status: 1, msg: 'Password reset'});
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
    resetPassword,
    current,
    github,
    githubCallback,
    logout
}