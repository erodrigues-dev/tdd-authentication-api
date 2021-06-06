const jwt = require('jsonwebtoken')

const { User } = require("../models");

class SessionController {
  async authenticate(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ message: "User not found" });

    const passwordIsValid = await user.checkPassword(password);
    if (!passwordIsValid)
      return res.status(401).json({ message: "Password is invalid" });

    const token = user.generateToken();

    return res.json({ user, token });
  }
}

module.exports = new SessionController();
