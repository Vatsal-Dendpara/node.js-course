const express = require("express");
require("../../Data Validator Service/src/db/mongoose");
const app = express();
const trackerRouter = require("./routers/tracker");

app.use(express.json());
app.use(trackerRouter);

module.exports = app;
