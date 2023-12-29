const mongoose = require("mongoose");
const { Schema } = mongoose;

const productListingSchema = new Schema(
  {
    name: { type: Schema.Types.String, required: true },
    email: {
      type: Schema.Types.String,
      required: true,
      validate: /\S+@\S+\.\S+/,
    },
    productName: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

const ProductListing = mongoose.model("ProductListing", productListingSchema);

module.exports = ProductListing;
