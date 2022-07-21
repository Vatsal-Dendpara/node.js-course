const express = require("express");
// const auth = require("../../../Data Pusher Service/src/middleware/auth");
const auth = require("../middleware/auth");
const router = new express.Router();

///to get data of user
router.get("/data", auth, async (req, res) => {
  res.send(req.user);
});
module.exports = router;
