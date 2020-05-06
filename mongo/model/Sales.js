const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    image:{
        type : Buffer,

    },
    expiresAt :{
        Type : Date,
        required:true
    },
    items:[
        {
            type : mongoose.Types.ObjectId,
            required : true
        }
    ]
},{
    timestamps : true
});

const Sales = mongoose.model("sale",SalesSchema);


module.exports = Sales;