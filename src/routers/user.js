const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

//Endpoint 1- to add users to DB
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Endpoint 2 - to get All Users
router.get("/users/me", auth, async (req, res) => {
  // try {
  //   const users = await User.find({});
  //   res.status(200).send(users);
  // } catch (e) {
  //   res.status(500).send(e);
  // }

  res.send(req.user);
});

//Endpoint 3 - to get user by its id.
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Endpoint 4 - to update user by its id.
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOp = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOp) {
    return res.status(404).send({ error: "invalid updates" });
  }
  try {
    const user = await User.findById(req.params.id);

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!user) {
      return res.send(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Endpoint 5 - to delete user by its id.

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Endpoint 6 - to authorize user

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
