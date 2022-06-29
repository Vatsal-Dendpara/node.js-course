const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Tasks = require("./models/tasks");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//Endpoint 1- to add users to DB
app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Endpoint 2 - to add Task to DB
app.post("/task", async (req, res) => {
  const task = new Tasks(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Endpoint 3 - to get All Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/users/:id", async (req, res) => {
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

app.get("/task", async (req, res) => {
  try {
    const task = await Tasks.find();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/task/:id", async (req, res) => {
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

app.listen(port, () => {
  console.log("server is running on port", port);
});
