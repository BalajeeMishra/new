const express = require("express");
const router = express.Router();
const Detail = require("../models/Detail");
const {isLoggedIn}=require("../middleware");
const AppError = require("../controlError/AppError");
const wrapAsync = require("../controlError/wrapasync");
const User=require("../models/user");
const { Router } = require("express");

router.get(
    "/student",
    wrapAsync(async (req, res, next) => {
      res.render("adminrelated/studentmarkfillup");
    })
  );

module.exports=router;