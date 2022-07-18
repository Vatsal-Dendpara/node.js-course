const express = require("express");
const app = express();
const userRouter = require("./routers/user");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(userRouter);

module.exports = app;
