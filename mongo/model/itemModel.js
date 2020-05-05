const mongoose = require("mongoose");


const itemSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    imageUrl :{
        type : String,
        required : true
    },
    price:{
        type : Number,
        required : true
    },

});

// const Item = mongoose.model("item" ,itemSchema);


module.exports = {item : itemSchema}