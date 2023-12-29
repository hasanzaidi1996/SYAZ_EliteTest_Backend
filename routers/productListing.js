const router = require("express").Router();

const ProductListing = require("../models/productListing.js");

router.get("/", async (req, res) => {
  const productListing = await ProductListing.find();
  res.json({ productListing });
});

router.post("/", async (req, res) => {
  try {
    const productListing = await ProductListing.create(req.body);
    res.json({ productListing });
  } catch (er) {
    console.log(er.message);
    res.status(400).json({ message: er.message });
  }
});

module.exports = router;
