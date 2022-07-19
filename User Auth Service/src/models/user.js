const { createClient } = require("redis");
const jwt = require("jsonwebtoken");
const client = createClient();
const EXPIRATION = 86400;
const { v1: uuidv1 } = require("uuid");

const saveUser = async (body) => {
  const result = await client.hSet(`users_${body.username}`, {
    id: uuidv1(),
    username: body.username,
    password: body.password,
  });
  return result;
};

const login = async (username) => {
  const res = await client.hGetAll(`users_${username}`);
  const token = jwt.sign({ id: res.id, username }, process.env.JWT_SECRET);

  res.token = token;
  return res;
};

const reqCounter = async (user) => {
  await client.hIncrBy(
    `users_${user.username}`,
    "requestCounter",
    1,
    (err, res) => {
      if (err) console.log(err);
    }
  );
  const data2 = await client.hGetAll(`users_${user.username}`);
  return data2;
};
const connect = async () => {
  await client.connect();
};
connect();
module.exports = {
  saveUser,
  login,
  reqCounter,
};
