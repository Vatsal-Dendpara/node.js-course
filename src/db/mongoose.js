const mongoose = require("mongoose");
const validator = require("validator");
mongoose.connect(process.env.MONGODB_URL);

// task model
// const Tasks = mongoose.model("Tasks", {
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });
