const amqp = require("amqplib");
const msg = { number: process.argv[2] };
connect();
async function connect() {
  try {
    const conn = await amqp.connect("amqp://localhost:5672");
    const channle = await conn.createChannel();
    const result = await channle.assertQueue("jobs");
    channle.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    console.log(`job sent ${msg.number}`);
    await channle.close();
    await conn.close();
  } catch (e) {
    console.error(e);
  }
}
