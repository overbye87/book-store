const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    //Bearer asdfasdfasdfasgasdg.asfasdfasdf.asdfasdfsadf
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "No token",
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).json({
      status: false,
      message: "Token authentication failed",
    });
  }
};
