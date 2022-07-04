const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require("multer");
const sharp = require("sharp");
const { sendWelcomeEmail, sendCancelEmail } = require("../emails/account");
//Endpoint 1- to add users to DB
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
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
// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }

//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

//Endpoint 4 - to update user by its id.
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOp = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOp) {
    return res.status(404).send({ error: "invalid updates" });
  }
  try {
    const user = req.user;

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

router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.params.id);

    // if (!user) {
    //   return res.status(404).send();
    // }

    req.user.remove();
    sendCancelEmail(req.user.email, req.user.name);
    res.send(req.user);
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

//Endpoint 7 - for logout user

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//endpoint 8 - to delete all the session of user
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.send(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/gm)) {
      return cb(new Error("please upload image file"));
    }

    cb(undefined, true);
  },
});

//endpoint 9: for saving user avatar in DB
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//endpoint 10: delete user avatar from DB

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

//endpoint 11: to get user avatar from DB

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});
module.exports = router;
