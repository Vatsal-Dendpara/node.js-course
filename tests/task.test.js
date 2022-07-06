const request = require("supertest");
const app = require("../src/app");
const Tasks = require("../src/models/tasks");
const {
  userOne,
  userOneId,
  setupDatabase,
  taskOne,
  taskTwo,
  userTwo,
  taskThree,
} = require("./fixtures/db");
beforeEach(setupDatabase);
test("should create task for user", async () => {
  const res = await request(app)
    .post("/task")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "From Test",
    })
    .expect(201);

  const task = await Tasks.findById(res.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("get task of particular user", async () => {
  const res = await request(app)
    .get("/task")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  expect(res.body.length).toBe(2);
});

test("testing delete task security", async () => {
  const res = await request(app)
    .delete(`/task/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(200);
});
