const express = require("express");
const cors = require("cors");
require("./db/mongoose");
jest.useFakeTimers();
const app = express();
// const validateRouter = require("./routers/validator");
app.use(cors());
app.use(express.json());
// app.use(validateRouter);

module.exports = app;
