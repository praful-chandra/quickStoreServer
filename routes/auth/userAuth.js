const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

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
    return res.status(400).json({ email: "email alredy exists" });
  }

  const newUser = new UserModel({
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

  UserModel.getUserByCredentials(recived.email,recived.password)
    .then(async (user) => {
      const token = await user.genToken();

      res.json({
        user,
        token,
      });
    })
    .catch((err) => {
      res.status(401).json({ error: "Auth Error" });
    });
});

module.exports = router;
