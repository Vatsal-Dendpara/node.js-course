const request = require("supertest");
const app = require("../src/app");

test("should push message to rabbitmq queue", async () => {
  await request(app)
    .post("/push")
    .set("Authorization", `Bearer ${process.env.TOKEN}`)
    .send({
      messages: [
        {
          message: "this is test message",
        },
        {
          message: "this is test message2",
        },
      ],
    })
    .expect(200);
});
