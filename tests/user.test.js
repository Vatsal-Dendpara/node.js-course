const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOne, userOneId, setupDB } = require("./fixtures/db");

beforeEach(setupDB);

test("should create a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "def",
      email: "vatsal@gmail.com",
      password: "vastal1234",
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: "def",
      email: "vatsal@gmail.com",
    },
    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe("vatsal1234");
});

test("should login existing user", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(res.body.user._id);
  expect(res.body.token).toBe(user.tokens[1].token);
});

test("should get profile of user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get profile for unauthenticate user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("should delete user profile", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not delete profile for unauthicate user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("should update user profile", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Riyan",
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Riyan");
});
