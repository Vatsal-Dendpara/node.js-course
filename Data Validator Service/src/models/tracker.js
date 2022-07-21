const mongoose = require("mongoose");
const validator = require("validator");

//mongoose schema
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

const User = mongoose.model("User", userSchema);

module.exports = User;
