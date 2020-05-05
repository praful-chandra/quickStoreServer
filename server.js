const express = require("express");
const passport = require("passport");

//Instantiate Express
const app = express();

//call Mongoose to connect
require("./mongo/mongo");

 // Used to initialize passport
app.use(passport.initialize());

const PORT = process.env.PORT || 5000;

//Start Server
app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});

app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Import User Routes
const userAuthRoute = require("./routes/auth/userAuth");
const ShopRoute = require("./routes/shop/shopRoutes");


//Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Backend of Quick_Shop",
  });
});

//AUthentication Routes
app.use("/api/auth/user", userAuthRoute);
app.use("/api/shop",ShopRoute);