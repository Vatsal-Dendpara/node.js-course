const express = require("express");
const Tasks = require("../models/tasks");
const router = new express.Router();
const auth = require("../middleware/auth");

//Endpoint 1 - to add Task to DB
router.post("/task", auth, async (req, res) => {
  // const task = new Tasks(req.body);
  const task = new Tasks({
    ...req.body,
    user_id: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Endpoint 2 - get all tasks from DB
router.get("/task", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const str = req.query.sortBy.split(":");
    sort[str[0]] = str[1] === "desc" ? -1 : 1;
  }
  try {
    //const task = await Tasks.find({ completed: req.query.completed });
    await req.user.populate({
      path: "tasks",
      match: match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.send(req.user.tasks);
    //res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Endpoint 3 - to get Task from DB by id
router.get("/task/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    //const task = await Tasks.findById(_id);

    const task = await Tasks.findOne({ _id, user_id: req.user._id });
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

//Endpoint 4 - to update Task by id
router.patch("/task/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOp = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOp) {
    return res.status(404).send({ error: "invalid updates" });
  }

  try {
    // const task = await Tasks.findById(req.params.id);

    const task = await Tasks.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });

    // const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Endpoint 3 - to delete Task from DB by id
router.delete("/task/:id", auth, async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
