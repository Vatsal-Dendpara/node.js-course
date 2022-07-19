const amqp = require("amqplib");

const validator = async () => {
  try {
    const conn = await amqp.connect("amqp://localhost:5672");
    const channle = await conn.createChannel();
    await channle.assertQueue("pusherService");
    channle.consume("pusherService", (message) => {
      const result = JSON.parse(message.content.toString());
      validate(result);
    });
  } catch (e) {
    console.error(e);
  }
};

const validate = async (data) => {
  console.log(data);
  if (data.number % 10 == 0) {
    data.number = Math.floor(Math.random() * 60) + 1;
    data.category = "Retried";
    setTimeout(() => {
      if (data.number % 10 == 0) {
        data.category = "Failed";
      }
    }, 4000);
    console.log(data);
  } else {
    data.category = "direct";
    console.log(data);
  }
};
validator();
