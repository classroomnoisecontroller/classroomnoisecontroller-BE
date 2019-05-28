const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

module.exports = {
  protected: function(req, res, next) {
    const token = req.headers.authorization;
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ msg: "unauthorized" });
      }
      req.decodedToken = decodedToken;
      next();
    });
  },
  generateToken: function(user) {
    const payload = {
      subject: user.id,
      username: user.username
    };
    const options = {
      expiresIn: `24h`
    };
    return jwt.sign(payload, secrets.jwtSecret, options);
  }
};
