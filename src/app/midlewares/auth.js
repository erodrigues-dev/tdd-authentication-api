const jwt = require("jsonwebtoken");
const promisify = require("util");

module.exports = (req, res, next) => {
  const headerAuthorization = req.headers.authorization;

  if (!headerAuthorization)
    return res.status(401).json({ message: "No JWT token is provided" });

  try {
    
    const [, token] = headerAuthorization.split(" ");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid JWT token is provided' })
  }


};
