const express = require("express");
const router = express.Router();
const Detail = require("../models/Detail");
const {isLoggedIn}=require("../middleware");
const {isAdmin}=require("../middleware");
const AppError = require("../controlError/AppError");
const wrapAsync = require("../controlError/wrapasync");
const User=require("../models/user");
const { Router } = require("express");
const Mark=require("../models/studentadminside");
const Dues=require("../models/dues");
const MonthlyPlan=require("../models/monthly");
var sessData;
var x=100;
var date=new Date();
var month=new Array();
month[0]="January";
month[1]="February";
month[2]="March";
month[3]="April";
month[4]="May";
month[5]="June";
month[6]="July";
month[7]="August";
month[8]="September";
month[9]="October";
month[10]="November";
month[11]="December";
var n =date.getMonth();
var nameofmonth = month[date.getMonth()];
router.get("/detail",(req,res)=>{
    res.render("dues",{month,monthbynum:n+1});
});

router.get("/all",async(req,res)=>{
     const count=req.session.count;
    const nameDetail= await Detail.find({userId:req.user._id});
    const duesDetail=await Dues.find({userId:req.user._id});
    const duesBack=duesDetail[0].feesDetail[0].dues;
    const monthlyplan=await MonthlyPlan.find({});
    const monthly=monthlyplan[0].monthly;
    const standard=nameDetail[0].classofs;
    var fees=duesDetail[0].feesDetail[0].valuetopaid;
    const total=duesBack+fees;
    const comment_id=duesDetail[0].feesDetail[0]._id;
Dues.update({'feesDetail._id': comment_id},
{'$set': {
       'feesDetail.$.total': total,
 }},
    function(err,model) {
     if(err){
      return res.send(err);
  }
  return res.render("payment",{nameofmonth,fees,duesBack,total,count}) ;
});
});
module.exports = router;