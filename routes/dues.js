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
    const newPayment=await Dues.find({});
    res.render("payment",{nameofmonth});
});
module.exports = router;