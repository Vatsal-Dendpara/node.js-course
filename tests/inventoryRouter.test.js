const request = require("supertest");
const Inventory = require("../src/models/inventoryModel");
const app = require("../src/app");
const { userOne, userOneId, setupDB, inv1, inv2 } = require("./fixtures/db");
beforeEach(setupDB);

test("should add new inventory", async () => {
  const res = await request(app)
    .post("/inventory/add")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      inventoryName: "test",
      inventoryCategory: "test1",
      expiryTime: "2022-07-15 11:30:000",
      quantity: 20,
      manufacturingTime: "2022-07-20 10:00:000",
    })
    .expect(200);

  const inventory = await Inventory.findById(res.body._id);
  expect(inventory).not.toBeNull();
});

test("to upload image of inventory", async () => {
  await request(app)
    .post(`/inventory/${inv1._id}/invImg`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("invImg", "tests/fixtures/profile-pic.jpg")
    .expect(200);
});
test("to get inventory data", async () => {
  await request(app)
    .get(`/inventory/${inv1._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
});

test("to get all inventory data", async () => {
  await request(app)
    .get("/inventory")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
});

test("to update inventory data", async () => {
  await request(app)
    .patch(`/inventory/update/${inv1._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      quantity: 30,
    })
    .expect(200);
});

test("to update inventory image", async () => {
  await request(app)
    .patch(`/inventory/${inv1._id}/invImg`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("invImg", "tests/fixtures/profile-pic.jpg")
    .expect(200);
});

test("to delete all inventory", async () => {
  await request(app)
    .delete("/inventory/deleteAll")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
});
