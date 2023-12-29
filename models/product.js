const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    name: { type: Schema.Types.String },
    email: { type: [Schema.Types.String] },
    productName: { type: String },
    rating: { type: Number },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
