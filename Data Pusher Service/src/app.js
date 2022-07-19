const express = require("express");
const cors = require("cors");
const app = express();
const pusherRouter = require("./routers/pusher");

app.use(cors());
app.use(express.json());
app.use(pusherRouter);

module.exports = app;
