const amqp = require("amqplib");
const { count } = require("console");
const express = require("express");
require("../db/mongoose");
const User = require("../models/tracker");
const router = new express.Router();

const validator = async () => {
  try {
    const conn = await amqp.connect("amqp://localhost:5672");
    const channle = await conn.createChannel();
    await channle.assertQueue("validator");
    await channle.consume("validator", async (message) => {
      const result = JSON.parse(message.content.toString());
      validate(result);
    });
  } catch (e) {
    console.error(e);
  }
};
validator();
const validate = async (data) => {
  if (data.number % 10 == 0) {
    data.number = Math.floor(Math.random() * 60) + 1;
    data.category = "Retried";
    setTimeout(() => {
      if (data.number % 10 == 0) {
        data.category = "Failed";
        console.log("if " + data.number);
        insertData(data);
      }
    }, 4000);
  } else {
    data.category = "direct";
    console.log("else " + data.number);
    insertData(data);
  }
};

const insertData = async (data) => {
  const user = {
    userMessage: data.message,
    userID: data.id,
    requestCount: parseInt(data.requestCounter),
    category: data.category,
  };

  try {
    const result = new User(user);
    await result.save();
    if (!result) {
      throw new Error();
    }
    console.log("Success");
  } catch (e) {
    console.log("error!", e);
  }
};

module.exports = {
  validator,
};
