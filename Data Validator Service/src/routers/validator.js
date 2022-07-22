const amqp = require("amqplib");
const axios = require("axios").default;
require("../db/mongoose");
// jest.useFakeTimers();
const User = require("../models/tracker");

//consume data of rabbitMQ queue
const validator = async () => {
  try {
    const conn = await amqp.connect("amqp://localhost:5672");
    const channle = await conn.createChannel();
    await channle.assertQueue("validator");
    await channle.consume("validator", async (message) => {
      const result = JSON.parse(message.content.toString());
      //validate data according to logic given in sheet
      validate(result);
    });
  } catch (e) {
    console.error(e);
  }
};
validator();
//to validate data
const validate = async (data) => {
  if (data.number % 10 == 0) {
    data.number = Math.floor(Math.random() * 60) + 1;
    data.category = "Retried";
    setTimeout(() => {
      if (data.number % 10 == 0) {
        data.category = "Failed";

        //insert data in mongo
        insertData(data);
      }
    }, 4000);
  } else {
    data.category = "direct";
    //console.log("else " + data.number);
    //insert data in mongo
    insertData(data);
  }
};

//to insert data in mongo
const insertData = async (data) => {
  let user;

  user = data.messages.map((msg) => {
    return {
      userMessage: msg.message,
      userID: data.id,
      requestCount: parseInt(data.requestCounter),
      category: data.category,
    };
  });
  try {
    const insert = await User.insertMany(user);
    if (!insert) {
      throw new Error();
    }
    // console.log("success!");

    //to fetch data of user where category is direct
    await fetchData(data.token);
  } catch (error) {
    console.log(error);
  }
};

//to fetch data from mongodb
const fetchData = async (token) => {
  try {
    axios
      .get("http://localhost:3003/data?category=direct", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  validator,
  validate,
};
