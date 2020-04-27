const express = require("express");

//Instantiate Express
const app = express();

//call Mongoose to connect
require("./mongo/mongo");

const PORT = process.env.PORT || 5000;

//Start Server
app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});

app.use(express.json());

//Import User Routes
const userAuthRoute = require("./routes/auth/userAuth");

//Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Backend of Quick_Shop",
  });
});

//AUthentication Routes
app.use("/auth/user", userAuthRoute);
