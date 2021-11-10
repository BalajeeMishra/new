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
    // const markDetail=[{}];
    // markDetail[0].subject="math";
    // markDetail[0].mark=65;
    const {math,English,sst,hindi,science}=req.body;  
    const newResult= new Mark({"math":65});
    // {markDetail[0].subject : markDetail[0].mark}
    await newResult.save();
    console.log(req.body);
    res.send("hello world");
});
  

module.exports=router;