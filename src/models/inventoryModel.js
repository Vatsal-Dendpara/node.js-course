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
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isDeleted: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0 || value > 1) {
          throw new Error("value must be between 0 and 1");
        }
      },
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

inventorySchema.methods.toJSON = function () {
  const inv = this;
  let invObj = inv.toObject();
  const obj2 = { is_expired: true };
  const currentTime = new Date();
  const expiryTime = new Date(invObj.expiryTime);

  if (expiryTime < currentTime) {
    Object.assign(invObj, obj2);
  }

  return invObj;
};

inventorySchema.methods.getValueByTimeZone = function (timeZone) {
  const inv = this;

  inv.expiryTime = new Date(inv.expiryTime).toLocaleString("en-US", {
    timeZone,
  });

  inv.manufacturingTime = new Date(inv.manufacturingTime).toLocaleString(
    "en-US",
    {
      timeZone,
    }
  );

  return inv;
};
const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;
