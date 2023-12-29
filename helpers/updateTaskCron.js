const cron = require("node-cron");
const Product = require("../models/product");

const updateTaskCron = () => {
  cron.schedule("0 0 * * *", async () => {
    const products = await Product.find();
    const updatedProductPromises = [];
    products.forEach((product) => {
      product.price = Math.floor(Math.random() * 1000) + 1;
      updatedProductPromises.push(product.save());
    });
    await Promise.all(updatedProductPromises);
  });
};

module.exports = updateTaskCron;
