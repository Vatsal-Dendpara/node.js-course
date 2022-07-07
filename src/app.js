const express = require("express");
require("./db/mongoose");
const app = express();
const inventoryRouter = require("./routers/inventoryRouter");
const userRouter = require("./routers/user");

app.use(express.json());

app.use(inventoryRouter);
app.use(userRouter);

module.exports = app;
