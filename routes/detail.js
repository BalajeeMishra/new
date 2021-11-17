const express = require("express");
const router = express.Router();
const Detail = require("../models/Detail");
const {isLoggedIn}=require("../middleware");
const AppError = require("../controlError/AppError");
const wrapAsync = require("../controlError/wrapasync");
const User=require("../models/user");
const moment=require("moment");
const multer = require('multer');
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
const { cloudinary } = require("../cloudinary");
const MonthlyPlan=require("../models/monthly");
const Dues=require("../models/dues");
router.get("/",isLoggedIn,wrapAsync(async(req,res)=>{
     res.render("afterdetail");
}));
router.get("/addmoreinformation",isLoggedIn,wrapAsync(async(req,res,next)=>{
  if (typeof req.user !== "undefined") {
  var detail= await Detail.find({userId:req.user._id});
  }
  // console.log(detail);
  if (typeof detail[0]  !== "undefined") {
  // var time=moment(detail[0].birthday).utc().format('YYYY/MM/DD');
  var date = new Date(detail[0].birthday);
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2,'0');
  var todayDate = String(date.getDate()).padStart(2, '0');
  var datePattern = year + '-' + month + '-' + todayDate;
  }
  res.render("addmoreinformation",{
    name:req.user.name,
  });
}));
router.post("/addmoreinformation", upload.single("image"),wrapAsync(async(req,res)=>{
 
    const user= req.user._id;
    const {age,mobno,birthday,gender,classofs,address,image}=req.body;
    const information= new Detail({age,mobno,birthday,gender,userId:user,classofs,address,image,name:req.user.name});
    if(typeof req.file!=undefined){
    const {path,filename}= req.file;
    information.images={
      url:path,
      filename
    };
  }
    await information.save();

 

    var fees;
  
   const nameDetail= await Detail.find({userId:req.user._id});
   const standard= nameDetail[0].classofs;
   const monthlyplan=await MonthlyPlan.find({});
   const monthly=monthlyplan[0].monthly;
     monthly.forEach(e => {
         if(e.class==standard){
              fees=e.fees;
         }
     });
   const newDuesPage=new Dues({userId:req.user._id,name:req.user.name});
   const arrayObj=[{
   }];
   arrayObj[0].val=fees;
   newDuesPage.feesDetail=await arrayObj.map(f => ({ valuetopaid:f.val  }));
  await newDuesPage.save();
  
}));
module.exports = router;