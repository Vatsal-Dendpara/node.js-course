const jwt = require("jsonwebtoken");
const {
  login,
  reqCounter,
} = require("../../../User Auth Service/src/models/user");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.decode(token, process.env.JWT_SECRET);
    let user = await login(decode.username);
    user = await reqCounter(user);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please Authenticate" });
  }
};
module.exports = auth;
