const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("../../passport/passport");

//MiddleWares
const authMiddleWare = require("../../middlewares/authMiddleWare");

//Models
const UserModel = mongoose.model("user");

//Test ROute
router.get("/test", (req, res) => {
  res.json({ message: "User Auth Route Works" });
});

router.post("/signin", async (req, res) => {
  const requiredFields = ["userName", "email", "password"];
  const recived = req.body;
  let isValid = requiredFields.every((field) =>
    Object.keys(recived).includes(field)
  );

  if (!isValid)
    return res.status(400).json({ error: "required fields not found" });

  let existingUser = await UserModel.find({ email: recived.email });

  if (existingUser.length > 0) {
    return res.status(400).send({ error: "email alredy exists" });
  }

  const newUser = new UserModel({
    provider: "email",
    userName: recived.userName,
    email: recived.email,
    password: recived.password,
  });

  const token = await newUser.genToken();

  newUser
    .save()
    .then((usr) => {
      res.status(201).json({
        user: usr,
        token,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/login", async (req, res) => {
  const requiredFields = ["email", "password"];
  const recived = req.body;
  let isValid = requiredFields.every((field) =>
    Object.keys(recived).includes(field)
  );

  if (!isValid)
    return res.status(400).json({ error: "required fields not found" });

  let existingUser = await UserModel.find({ email: recived.email });

  if (existingUser.length === 0) {
    return res.status(401).json({ error: "Auth Error" });
  }

  UserModel.getUserByCredentials(recived.email, recived.password)
    .then(async (user) => {
      const token = await user.genToken();

      user.save().then((data) => {
        res.json({
          user: data,
          token,
        });
      });
    })
    .catch((err) => {
      res.status(401).json({ error: "Auth Error" });
    });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router.get(
  "/googleOAuthCallback",
  passport.authenticate("google"),
  async function (req, res) {
    let user = req.user._json;
    let existingUser = await UserModel.find({ email: user.email });

    if(existingUser.length > 0){
      UserModel.findOne({email :user.email})    .then(async (usr) => {
        const token = await usr.genToken();
  
        usr.save().then((data) => {
          return res.redirect(`${process.env.CLIENT_URL}handleToken/${token}`);
        });
      })
      .catch((err) => {
        res.status(401).json({ error: "Auth Error" });
      });

      return;
    }
    

    const newUser = new UserModel({
      provider: "google",
      userName: user.name,
      email: user.email,
      password: null,
    });

    const token = await newUser.genToken();

    newUser
      .save()
      .then((usr) => {
        return res.redirect(`${process.env.CLIENT_URL}handleToken/${token}`);

        // res.status(201).json({
        //   user: usr,
        //   token,
        // });
      })
      .catch((err) => {
        return res.redirect(`${process.env.CLIENT_URL}`);
      });

    // console.log(req.user);
    // res.json(req.user._json);
  }
);

router.post("/logout" ,authMiddleWare ,(req,res)=>{
  const token  = req.headers.authorization;
  const user = req.user;
  let tokens  = user.loggedIn.filter(data=>data.token !== token );

  user.loggedIn = tokens;
  user.save();
  res.send();
})

router.post("/validateuser", authMiddleWare, (req, res) => {
  res.json(req.user);
});

module.exports = router;
