const request = require("supertest");
const app = require("../src/app");
const fs = require("fs");
const { v1: uuidv1 } = require("uuid");
const {
  setupDB,
  findUser,
  testUserVatsalId,
  testUser_vatsal112,
} = require("./fixtures/db");

beforeEach(setupDB);

test("should create a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      username: "def123",
      password: "def1234",
    })
    .expect(200);

  const user = await findUser("def123");
  expect(user).not.toBeNull();
  expect(user.password).toEqual("def1234");
});

test("should login existing user", async () => {
  const response = await request(app)
    .post("/user/login")
    .send({
      username: testUser_vatsal112.username,
      password: testUser_vatsal112.password,
    })
    .expect(200);
  fs.appendFileSync(
    "/home/vatsal/Vatsal/node-course/node.js-course/Assignment-4/config/test.env",
    `TOKEN=${response.body.token}`
  );
  expect(response.body.token).not.toBeNull();
});
