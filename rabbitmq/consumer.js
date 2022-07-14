const amqp = require("amqplib");
connect();
async function connect() {
  try {
    const conn = await amqp.connect("amqp://localhost:5672");
    const channle = await conn.createChannel();
    const result = await channle.assertQueue("jobs");
    channle.consume("jobs", (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Received job with input ${input.number}`);
    });
  } catch (e) {
    console.error(e);
  }
}
