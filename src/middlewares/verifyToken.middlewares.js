const JWT = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res
        .status(403)
        .json({ status: "failed", message: "No token provided!" });
    }
    const tokenSplit = token.split(" ");

    if (tokenSplit[0] != "Bearer") {
      return res
        .status(403)
        .json({ status: "failed", message: "Invalid token" });
    }

    if (!tokenSplit[1]) {
      return res
        .status(403)
        .json({ status: "failed", message: "Invalid token" });
    }

    const payload = JWT.verify(tokenSplit[1], "secret");
    if (!payload) {
      return res
        .status(403)
        .json({ status: "failed", message: "Not Authorized..." });
    }
    req.payload = payload;
    next();
  } catch (err) {
    req.payload = null;
    return res
        .status(403)
        .json({ status: "failed", message: "Not Authorized..." });
  }
};

module.exports = { verifyToken };
