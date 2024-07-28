const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }
  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.decode(token, JWT_SECRET);

    req.username = decode.username;
    req.pssword = decode.password;

    next();
  } catch (error) {
    res.status(403).json({});
  }
}

module.exports = {
  authMiddleware,
};
