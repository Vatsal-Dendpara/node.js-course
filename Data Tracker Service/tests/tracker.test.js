const request = require("supertest");
const app = require("../src/app");
test("should get data of user", async () => {
  const user = await request(app)
    .get("/data")
    .set("Authorization", `Bearer ${process.env.TOKEN}`)
    .send()
    .expect(200);
});

test("should get data by category and date", async () => {
  const user = await request(app)
    .get("/data/filter?date=2022-07-21&category=direct")
    .set("Authorization", `Bearer ${process.env.TOKEN}`)
    .send()
    .expect(200);
});
