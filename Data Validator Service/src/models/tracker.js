const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    userMessage: {
      type: String,
    },
    userID: {
      type: String,
      required: true,
    },
    requestCount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// userSchema.pre("save", async function (next) {
//   const user = this;
//   const msg = {
//     message: user.userMessage,
//   };
//   user.userMessage = user.userMessage.concat({ msg });
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
