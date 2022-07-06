const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Tasks = require("../../src/models/tasks");
const User = require("../../src/models/user");
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "John",
  email: "vatsaldendpara007@gmail.com",
  password: "vatsal1234",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "vtz",
  email: "vatsal.dendpara@marutitech.com",
  password: "vatsal1234",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First task",
  completed: false,
  user_id: userOne._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "second task",
  completed: true,
  user_id: userOne._id,
};
const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "third task",
  completed: true,
  user_id: userTwo._id,
};
const setupDatabase = async () => {
  await User.deleteMany();
  await Tasks.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Tasks(taskOne).save();
  await new Tasks(taskTwo).save();
  await new Tasks(taskThree).save();
};

module.exports = {
  userOne,
  userTwo,
  userOneId,
  setupDatabase,
  taskOne,
  taskTwo,
  taskThree,
};
