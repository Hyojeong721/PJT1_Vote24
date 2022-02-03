const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, "ssafy");
    return next();
  } catch (err) {
    logger.info("JWT ERROR" + err);
    return res.json(err);
  }
};

module.exports = { verifyToken };
