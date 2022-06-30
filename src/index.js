const express = require("express");
require("./db/mongoose");
const Tasks = require("./models/tasks");
const app = express();
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET request are disabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   if (req.method === "GET" || req.method === "POST") {
//     res.status(503).send("Site is under maintainance");
//   }
// });
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("server is running on port", port);
});

//jwt excercise

// const jwt = require("jsonwebtoken");

// const func = async () => {
//   const token = jwt.sign({ _id: "12343" }, "hellohowareyou", {
//     expiresIn: "7 days",
//   });
//   console.log(token);
//   const data = jwt.verify(token, "hellohowareyou");
//   console.log(data);
// };
// func();
