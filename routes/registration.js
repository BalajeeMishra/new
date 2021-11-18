const express = require("express");
const router = express.Router();
const Detail = require("../models/Detail");
const {isLoggedIn}=require("../middleware");
const {isAdmin}=require("../middleware");
const RegistrationStatus=require("../models/registration");
router.get("/of_student",isLoggedIn,  async(req,res)=>{
    const totalRegistration=  await RegistrationStatus.find({});
    console.log(totalRegistration);
    res.render("adminrelated/newRegistration",{totalRegistration});
});
module.exports=router;
