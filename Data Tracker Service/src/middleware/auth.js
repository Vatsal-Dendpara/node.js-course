const jwt = require("jsonwebtoken");
const User = require("../../../Data Validator Service/src/models/tracker");

//for user authorization
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.decode(token, process.env.JWT_SECRET);
    let user = await User.find({
      userID: decode.id,
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    req.id = decode.id;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please Authenticate" });
  }
};
module.exports = auth;
