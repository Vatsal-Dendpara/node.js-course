const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const Tasks = mongoose.model("Tasks", {
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

const task = new Tasks({
  description: "Lunch",
  completed: true,
});

task
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
