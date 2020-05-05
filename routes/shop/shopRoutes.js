const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("../../passport/passport");

//MiddleWares
const authMiddleWare = require("../../middlewares/authMiddleWare");

//Models
const Category = mongoose.model("category");

//Test ROute
router.get("/test",  (req, res) => {
  res.json({ message: "Shop  Route Works" });
});

router.post("/addCategory",async (req, res) => {
  const requiredFields = ["imageUrl", "title"];
  const recived = req.body;
  let isValid = requiredFields.every((field) =>
    Object.keys(recived).includes(field)
  );

  if (!isValid)
    return res.status(400).json({ error: "required fields not found" });


    const existingCategory = await Category.find({title : recived.title});

    if (existingCategory.length > 0) {
        return res.status(400).send({ error: "Category alredy exists" });
      }
 new Category({
        title : recived.title,
        imageUrl : recived.imageUrl
    })
    .save()
    .then(category=>res.status(201).json(category))
    .catch(err=>res.status(500).json(err))

});

router.post("/additems",async (req,res)=>{
    const requiredFields = ["imageUrl", "name","price","category"];
    const recived = req.body;
    let isValid = requiredFields.every((field) =>
      Object.keys(recived).includes(field)
    );
  
    if (!isValid)
      return res.status(400).json({ error: "required fields not found" });

    
    const existingCategory = await Category.findOne({title : recived.category});

     if (!existingCategory) {
          return res.status(400).send({ error: "Category Doesnot Exist" });
        }
    delete recived.category;
    existingCategory.items.push({...recived});

    existingCategory.save().then(data=>res.json(data)).catch(err=>res.json(err))

})


router.get("/items",async (req,res)=>{
    const Items = await Category.find();

    res.json(Items);
})

router.post("/itemById",async (req,res)=>{
  
  const Item = await Category.findById(req.body.id);
  res.json(Item);

})
module.exports = router;
