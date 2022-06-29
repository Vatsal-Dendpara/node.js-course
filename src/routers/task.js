const express = require("express");
const Tasks = require("../models/tasks");
const router = new express.Router();

//Endpoint 1 - to add Task to DB
router.post("/task", async (req, res) => {
  const task = new Tasks(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Endpoint 2 - get all tasks from DB
router.get("/task", async (req, res) => {
  try {
    const task = await Tasks.find();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Endpoint 3 - to get Task from DB by id
router.get("/task/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Tasks.findById(_id);
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

//Endpoint 4 - to update Task by id
router.patch("/task/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOp = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOp) {
    return res.status(404).send({ error: "invalid updates" });
  }

  try {
    const task = await Tasks.findById(req.params.id);

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();
    // const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Endpoint 3 - to delete Task from DB by id
router.delete("/task/:id", async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
