const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryName: {
      type: String,
      required: true,
      trim: true,
    },
    inventoryCategory: {
      type: String,
      required: true,
      trim: true,
    },
    expiryTime: {
      type: Date,
    },
    quantity: {
      type: Number,
      default: 10,
      validate(value) {
        if (value < 0) {
          throw new Error("Quantity must be a positive number");
        }
      },
    },
    manufacturingTime: {
      type: Date,
    },
    inventoryImage: {
      type: Buffer,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// inventorySchema.pre("save", async function (next) {
//   const inventory = this;
//   const cstDateTime = new Date().toLocaleString("en-US", {
//     timeZone: "America/Chicago",
//   });
//   if (inventory.isModified("expiryTime")) {
//     inventory.expiryTime = new Date(cstDateTime);
//   }

//   if (inventory.isModified("manufacturingTime")) {
//     inventory.manufacturingTime = new Date(cstDateTime);
//   }
//   next();
// });

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;
