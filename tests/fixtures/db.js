const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Inventory = require("../../src/models/inventoryModel");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "abcd",
  email: "vatsaldendpara112@gmail.com",
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
  name: "Jimmy",
  email: "vatsal.dendpara@marutitech.com",
  password: "vatsal1234",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const inv1 = {
  _id: new mongoose.Types.ObjectId(),
  inventoryName: "My Shop",
  inventoryCategory: "Business",
  expiryTime: "2022-07-25 11:30:000",
  quantity: 20,
  inventoryImage: "",
  manufacturingTime: "2022-07-10 10:00:000",
  user_id: userOne._id,
};

const inv2 = {
  _id: new mongoose.Types.ObjectId(),
  inventoryName: "Cloth Shop",
  inventoryCategory: "Clothing",
  expiryTime: "2022-07-30 12:00:000",
  quantity: 20,
  inventoryImage: "",
  manufacturingTime: "2022-07-12 11:00:000",
  user_id: userTwo._id,
};

const setupDB = async () => {
  await User.deleteMany();
  await Inventory.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Inventory(inv1).save();
  await new Inventory(inv2).save();
};

module.exports = {
  setupDB,
  userOne,
  userOneId,
  inv1,
  inv2,
};
