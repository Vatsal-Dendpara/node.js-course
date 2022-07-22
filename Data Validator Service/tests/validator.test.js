const amqp = require("amqplib");
// const request = require("supertest");
// const app = require("../src/app");
const { validate } = require("../src/routers/validator");
test("should validate rabbitmq Queue", async () => {
  const conn = await amqp.connect("amqp://localhost:5672");
  const channle = await conn.createChannel();
  await channle.assertQueue("validator");
  await channle.consume("validator", async (message) => {
    const result = JSON.parse(message.content.toString());
    validate(result);
  });
});
