const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const { saveUser, login } = require("../models/user");
const auth = require("../middleware/auth");

//endpoint-1: Signup user
router.post("/users", async (req, res) => {
  try {
    const expr = /^[a-zA-Z0-9_]{5,15}$/;
    if (!expr.test(req.body.username)) {
      return res.status(400).send({
        error:
          "Username should be between 5 to 15 characters long and only alphanumeric",
      });
    }

    if (req.body.password.length <= 6 || req.body.password.length >= 12) {
      return res.status(400).send({
        error: "password should be between 6 to 12 characters long",
      });
    }
    const user = await saveUser(req.body);
    if (user === 0) {
      return res.status(400).send({ error: "username already exist!" });
    }
    res.json({
      status: "Success!",
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

//endpoint-2: login user
router.post("/user/login", async (req, res) => {
  try {
    const user = await login(req.body.username);
    if (user.username == undefined) {
      return res.status(400).send({
        error: "invalid username",
      });
    }

    if (user.password != req.body.password) {
      return res.status(404).send({
        error: "invalid password",
      });
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;
