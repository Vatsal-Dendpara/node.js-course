const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const User = require("../../../Data Validator Service/src/models/tracker");
///to get data of user
router.get("/data", auth, async (req, res) => {
  try {
    let data = await User.find({ userID: req.id });
    if (req.query.category) {
      data = data.filter((d) => {
        return d.category == req.query.category;
      });
    }
    if (req.query.message) {
      data = data.filter((d) => {
        return d.userMessage.includes(req.query.message);
      });
    }
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

//to get count of data by category & date
router.get("/data/filter", auth, async (req, res) => {
  try {
    if (req.query.date && req.query.category) {
      const result = await User.find({
        category: req.query.category,
        createdAt: {
          $gte: new Date(req.query.date),
        },
      });

      if (!result) {
        throw new Error();
      }
      res.send({ results: Object.keys(result).length });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
