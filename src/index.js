const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Tasks = require("./models/tasks");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//Endpoint 1- to add users to DB
app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

//Endpoint 2 - to add Task to DB
app.post("/task", (req, res) => {
  const task = new Tasks(req.body);

  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

//Endpoint 3 - to get All Users
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((e) => res.status(500).send(e));
});

app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

app.get("/task", (req, res) => {
  Tasks.find({})
    .then((task) => {
      res.send(task);
    })
    .catch((e) => res.status(500).send());
});

app.get("/task/:id", (req, res) => {
  const _id = req.params.id;
  Tasks.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    })
    .catch((e) => res.status(500).send());
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
