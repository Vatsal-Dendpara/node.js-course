const { createClient } = require("redis");
const jwt = require("jsonwebtoken");
const client = createClient();
const EXPIRATION = 86400;
const { v1: uuidv1 } = require("uuid");

const testUserVatsalId = uuidv1();
const testUser_vatsal112 = {
  id: testUserVatsalId,
  username: "vatsal112",
  password: "vatsal123",
};

const setupDB = async () => {
  await client.flushAll("ASYNC", (err, res) => {
    console.log(res);
  });
  await client.hSet("users_vatsal112", testUser_vatsal112);
};

const findUser = async (username) => {
  return await client.hGetAll(`users_${username}`);
};
const connect = async () => {
  await client.connect();
};
connect();
module.exports = {
  setupDB,
  findUser,
  testUser_vatsal112,
  testUserVatsalId,
};
