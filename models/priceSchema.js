const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
  {
    id: String,
    currency: String,
    value: String,
  },
  {
    timestamps: true,
  }
);

const Price = mongoose.model("Price", priceSchema);
module.exports = Price;
