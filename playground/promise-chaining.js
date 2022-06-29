require("../src/db/mongoose");
const User = require("../src/models/user");

//Promise chaining for user
User.findByIdAndUpdate("62baee27ddf4d2c39db31473", { age: 1 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then((user) => console.log(user))
  .catch((e) => console.log(e));
