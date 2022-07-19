const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const publisher = require("../publisher/publisher");

router.post("/push", auth, async (req, res) => {
  try {
    const data = {
      id: req.user.id,
      message: req.body.message,
      number: Math.floor(Math.random() * 60) + 1,
      requestCounter: req.user.requestCounter,
    };
    await publisher(data);
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
