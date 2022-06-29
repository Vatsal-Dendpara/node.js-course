require("../src/db/mongoose");
const Tasks = require("../src/models/tasks");

//Promise chaining for Task
Tasks.findByIdAndRemove("62bae155d4f1687e98a48699")
  .then((task) => {
    console.log(task);
    return Tasks.countDocuments({ completed: false });
  })
  .then((task) => console.log(task))
  .catch((e) => console.log(e));
