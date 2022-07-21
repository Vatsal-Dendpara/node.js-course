const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const publisher = require("../publisher/publisher");

router.post("/push", auth, async (req, res) => {
  try {
    const data = {
      id: req.user.id,
      messages: req.body.messages,
      number: Math.floor(Math.random() * 60) + 1,
      requestCounter: req.user.requestCounter,
      token: req.token,
    };
    await publisher(data);
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
