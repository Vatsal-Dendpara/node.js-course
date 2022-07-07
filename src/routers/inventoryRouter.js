const express = require("express");
const Inventory = require("../models/inventoryModel");
const router = new express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//endpoint 1: to add data in inventory
router.post("/inventory/add", auth, async (req, res) => {
  const keys = Object.keys(req.body);
  const inventory = new Inventory({
    ...req.body,
    user_id: req.user._id,
  });

  keys.forEach((key) => {
    if (key == "expiryDate" || key == "manufacturing") {
      inventory.key = new Date(req.body[key]);
    }
  });

  try {
    await inventory.save();
    res.send(inventory);
  } catch (e) {
    res.status(500).send(e);
  }
});

//for save image in local folder
const upload = multer({
  dest: "images/",
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/gm)) {
      return cb(new Error("please upload image file"));
    }

    cb(undefined, true);
  },
});

//endpoint 2: for uploading image for inventory
router.post(
  "/inventory/:id/invImg",
  auth,
  upload.single("invImg"),
  async (req, res) => {
    const id = req.params.id;
    const inv = await Inventory.findOne({
      _id: id,
      user_id: req.user._id,
    });
    if (!inv) {
      return res.status(404).send();
    }
    inv.inventoryImage = path.join(
      __dirname,
      "../../images/" + req.file.filename
    );
    await inv.save();
    res.send(inv);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//endpoint 3: to get single inventory data
router.get("/inventory/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    const inv = await Inventory.findOne({
      _id: id,
      user_id: req.user._id,
    });

    if (!inv) {
      return res.status(404).send();
    }
    res.send(inv);
  } catch (e) {
    res.status(500).send(e);
  }
});

//endpoint 4: to get all inventory data
router.get("/inventory", auth, async (req, res) => {
  const match = {};
  if (req.query.inventoryName) {
    match.inventoryName = req.query.inventoryName;
  }
  if (req.query.inventoryCategory) {
    match.inventoryCategory = req.query.inventoryCategory;
  }
  try {
    await req.user.populate({
      path: "inventoryModel",
      match: match,
    });

    const data = req.user.inventoryModel.filter((data) => {
      return data.isDeleted == 0;
    });
    res.send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

//router 5: to update inventory data
router.patch("/inventory/update/:id", auth, async (req, res) => {
  const validateId = isValidId(req.params.id, req.user._id);
  const allowedUpdates = [
    "inventoryName",
    "inventoryCategory",
    "expiryTime",
    "quantity",
    "manufacturingTime",
  ];
  const keys = Object.keys(req.body);

  const isValidUpdate = keys.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidUpdate) {
    return res.status(404).send({
      error: "invalid Updates",
    });
  }
  try {
    const inv = await Inventory.findOne({ _id: req.params.id });
    if (!validateId) {
      return res.status(404).send();
    }

    keys.forEach((update) => {
      return (inv[update] = req.body[update]);
    });
    await inv.save();
    res.send(inv);
  } catch (e) {
    res.status(500).send(e);
  }
});

//endpoint 6: to update inventory image
router.patch(
  "/inventory/:id/invImg",
  auth,
  upload.single("invImg"),
  async (req, res) => {
    const validateId = await isValidId(req.params.id, req.user._id);

    if (req.file.fieldname != "invImg") {
      return res.status(404).send({
        error: "invalid Update or field name",
      });
    }
    try {
      if (!validateId) {
        return res.status(400).send();
      }
      const inv = await Inventory.findOne({ _id: req.params.id });
      inv.inventoryImage = path.join(
        __dirname,
        "../../images/" + req.file.filename
      );
      await inv.save();
      res.send(inv);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

//endpoint 7: to delete inventories
router.delete("/inventory/deleteAll", auth, async (req, res) => {
  const inv = await Inventory.find({});
  inv.forEach((i) => {
    if (i.inventoryImage != "") {
      fs.unlink(i.inventoryImage, (err) => {
        if (err) return res.send(err);
      });
    }
  });
  await Inventory.updateMany({ isDeleted: 1 });
  res.send();
});

//to validate inventory id.
const isValidId = async (id, userId) => {
  const inv = await Inventory.findOne({
    _id: id,
    user_id: userId,
  });
  return inv;
};

module.exports = router;
