const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    title: { type: Schema.Types.String },
    description: { type: [Schema.Types.String] },
    price: { type: Schema.Types.Number },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
