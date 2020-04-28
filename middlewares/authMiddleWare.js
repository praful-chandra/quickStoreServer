const mongoose = require("mongoose");
const jsonWebToken = require("jsonwebtoken");
const {SaltOrKey} = require("../keys/keys");

const User = mongoose.model("user");

const auth = async (req,res,next)=>{
    try{

        const userToken = req.headers.authorization.replace("Bearer ","");        
        const verifiedToken = await jsonWebToken.verify(userToken,SaltOrKey);

        

        const user = await User.findOne({
            _id : verifiedToken._id,
            "loggedIn.token" : userToken
        })

        if(!user){
            throw new Error("Auth Error");
        }

        req.user = user;
        req.token = userToken;
        next();
    }
    catch (err){
        res.status(401).json({
            error: "not AUthorized !",
          });
    }
}

module.exports = auth;