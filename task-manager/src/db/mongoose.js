const mongoose = require("mongoose");
const validator = require("validator");
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");

// task model
const Tasks = mongoose.model("Tasks", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

//insert in task model

const task = new Tasks({
  description: "Go To Gym",
});

task
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

//User Model

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     trim: true,
//     required: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is invalid");
//       }
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be positive number");
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 7,
//     validate(value) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error('Password cannot be same as "password"');
//       }
//     },
//   },
// });

// Inserting in user model

// const addUser = new User({
//   name: "John",
//   email: "john@gmail.com",
//   password: "john123",
// });

// addUser
//   .save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
