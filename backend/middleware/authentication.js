const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateUser = (req, res, next) => {
  const token = req.headers["auth"];
  if (!token) {
    return res.json({
      statusCode: 1,
      error: "Unauthorised User",
    });
  }
  const resp = jwt.verify(token, "" + process.env.SECRET);
  req.payload = resp;
  next();
};

module.exports = { validateUser };
