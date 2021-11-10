const express = require("express");
const router = express.Router();
const Detail = require("../models/Detail");
const {isLoggedIn}=require("../middleware");
const AppError = require("../controlError/AppError");
const wrapAsync = require("../controlError/wrapasync");
const User=require("../models/user");
const { Router } = require("express");
const Mark=require("../models/studentadminside");
var selected_student;
router.get("/",(req,res)=>{
  res.send("result uploaded successfully...")
})
router.get(
    "/student",
    wrapAsync(async (req, res, next) => {
      res.render("adminrelated/fillinformation");
    })
  );
  router.get("/detail",async(req,res)=>{
    res.render("adminrelated/aboutstudent",{selected_student});
  });


  router.post("/class",wrapAsync(async(req,res,next)=>{
     selected_student=await Detail.find(req.body);
    res.redirect("/result/detail");

  }));
  router.get("/markfillup/:id",async(req,res)=>{
        
        res.render("adminrelated/studentmarkfillup",{
          id:req.params.id
        });
  });
  router.post("/markfillup/:id",async(req,res)=>{
    const arrayObj=[];
    for(var i in req.body){
      arrayObj.push({key:i,val:req.body[i]});
    }
    // arrayObj=[req.body];
    // console.log(arrayObj);
    // const result = arrayObj.map((value,i) => {
    //   let [key, val] = Object.entries(value)[i];
    //   return {key, val}
    // });
    const newMark= new Mark({userId:req.params.id});
    newMark.markDetail=await arrayObj.map(f => ({ subject: f.key, mark: f.val }));
    await newMark.save();
    // req.flash("success", "Result added successfully!")
    res.redirect("/result");
});
  

module.exports=router;