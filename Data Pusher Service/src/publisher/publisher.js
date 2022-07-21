const amqp = require("amqplib");
const publisher = async (data) => {
  try {
    const conn = await amqp.connect("amqp://localhost:5672");
    const channle = await conn.createChannel();
    const res = await channle.assertQueue("pusherService");
    channle.sendToQueue("validator", Buffer.from(JSON.stringify(data)));
    console.log("Success");
    await channle.close();
    await conn.close();
  } catch (e) {
    console.error(e);
  }
};
module.exports = publisher;
