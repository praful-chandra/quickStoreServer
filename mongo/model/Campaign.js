const mongoose = require("mongoose");


const CampaignSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    image :{
        type : Buffer,
        required : true
    },
    expiresAt:{
        type : Date,
        required:true
    },
    description:{
        type : String,
        required : true
    },
    items :[
        {
            type : mongoose.Types.ObjectId,
            required:true,
        }
    ]

},{
    timestamps:true
});

const Campaign = mongoose.model("campaign" ,CampaignSchema);


module.exports = Campaign