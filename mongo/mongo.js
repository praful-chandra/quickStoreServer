const mongoose = require("mongoose");

const {MONGO_URI} = require("../keys/keys")

mongoose.connect(MONGO_URI,{useNewUrlParser:true, useUnifiedTopology: true})

//Adding Models
require("./model/userModel");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("MongoDB connected")
});