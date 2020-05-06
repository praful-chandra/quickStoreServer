const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
  image: {
    type: Buffer,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  items: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  ],
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
