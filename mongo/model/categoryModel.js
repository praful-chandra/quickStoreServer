const mongoose = require("mongoose");

const Item = require("./itemModel").item;

const categorySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  items: [
    {
      type: Item,
      required: true,
    },
  ],
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
