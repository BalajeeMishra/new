const express = require("express");
const router = express.Router();
const Detail = require("../models/Detail");
const {isLoggedIn}=require("../middleware");
const {isAdmin}=require("../middleware");




router.get("/control",isLoggedIn,isAdmin, async(req,res)=>{
    res.render("adminrelated/adminhomepage");
});
module.exports=router;
