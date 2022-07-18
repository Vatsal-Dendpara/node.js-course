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

const login = async (email) => {
  const res = await client.hGetAll(`users_${email}`);
  const token = jwt.sign({ id: res.id }, process.env.JWT_SECRET);

  res.token = token;
  return res;
};
const connect = async () => {
  await client.connect();
};
connect();
module.exports = {
  saveUser,
  login,
};
