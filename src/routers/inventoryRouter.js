const express = require("express");
const Inventory = require("../models/inventoryModel");
const router = new express.Router();
const auth = require("../middleware/auth");

//endpoint 1: to add data in inventory
router.post("/inventory/add", auth, async (req, res) => {
  const keys = Object.keys(req.body);
  const inventory = new Inventory({
    ...req.body,
    user_id: req.user._id,
  });

  //   const data = req.user;

  keys.forEach((key) => {
    if (key == "expiryDate" || key == "manufacturing") {
      inventory.key = new Date(req.body[key]);
    }
  });

  try {
    await inventory.save();
    res.send({
      response: "Success!!",
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
