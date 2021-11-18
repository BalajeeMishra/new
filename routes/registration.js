const express = require("express");
const router = express.Router();
const Detail = require("../models/Detail");
const {isLoggedIn}=require("../middleware");
const {isAdmin}=require("../middleware");
const RegistrationStatus=require("../models/registration");
router.get("/of_student",(req,res)=>{
    
    res.render("adminrelated/registration");
})
module.exports=router;
