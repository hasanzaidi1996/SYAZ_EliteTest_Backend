const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// apply rate limiter
const rateLimit = require("express-rate-limit");

const productRoutes = require("./routers/product.js");
const productListingRoutes = require("./routers/productListing.js");
const updateTaskCron = require("./helpers/updateTaskCron.js");
// Configure dotenv to load environment variables
require("dotenv").config();

// Create an Express application and use JSON middleware
const app = express();
app.use(express.json());

// Use CORS to allow cross-origin requests
app.use(cors());
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use("/products", productRoutes);
app.use("/productListing", productListingRoutes);

// Define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Define route handlers for the different routes
app.all("*", (req, res) => {
  res.status(404).json({
    message: "Resource not found",
  });
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_DB_URI, { useNewUrlParser: true })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      // cron job to update product prices every 24 hours

      updateTaskCron();
      console.log("Server started on port 3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
