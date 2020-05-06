const mongoose = require("mongoose");

let ObId = mongoose.Types.ObjectId;

const featuredCategorySchema = new mongoose.Schema({
    one:{
        category : ObId
    },
    two:{
        category : ObId
    },
    three:{
        category : ObId
    },
    four:{
        category : ObId
    },
    five:{
        category : ObId
    },
});

const FeaturedCategory = mongoose.model("featuredCategory",featuredCategorySchema);

module.exports = FeaturedCategory;