const express = require("express");
const cors = require("cors");
const app = express();
const validateRouter = require("./routers/validator");

app.use(cors());
app.use(express.json());
app.use(validateRouter);

module.exports = app;
