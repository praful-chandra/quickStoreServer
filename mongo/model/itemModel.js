const mongoose = require("mongoose");


const itemSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    image :{
        type : Buffer,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
    category:{
        type : mongoose.Types.ObjectId,
        required:true
    },
    onSale:Boolean,
    sale:{
        saleId : mongoose.Types.ObjectId,
        discountPer : Number
    }

},{
    timestamps:true
});

const Item = mongoose.model("item" ,itemSchema);


module.exports = Item