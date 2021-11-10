const express = require("express");
const router = express.Router();
const User = require("../models/user");
const AppError = require("../controlError/AppError");
const wrapAsync = require("../controlError/wrapasync");
const passport = require("passport");
const { body,check } = require('express-validator');
const {isLoggedIn}=require("../middleware");
const { defaultMaxListeners } = require("events");
// const nodemailer = require("nodemailer");
// const jwt = require('jsonwebtoken');
const path = require("path");
var ejs = require('ejs');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const doc = new PDFDocument();
var pdf = require('html-pdf');


router.get("/dashboard", async (req, res) => {

//   User.findOneAndUpdate(req.user.name, {"admin":true}, {upsert: true}, function(err, doc) {
//     if (err) return res.send(500, {error: err});
//     return res.send('Succesfully saved.');
// });

   res.render("dashboard",{
     user:req.user
   });
   
});

router.get("/result",async(req,res)=>{
 var m=__dirname.slice(0, __dirname.length-7);
  // ejs.render();
  ejs.renderFile(path.join(__dirname.slice(0, __dirname.length-7),"views/report.ejs"),{val:"balajee",currentUser:req.user, success:0, error:0},{},function(err, str) {
    if (err) { console.log(err);
   
     return res.send(err).status(400);
    }

    // str now contains your rendered html
    pdf.create(str).toFile(`${m}/public/report.pdf`, function(err, data) {
      if (err) return res.send(err)

      // res.attachment('report.pdf');
      res.render("result.ejs");
    });
  });
})

router.get(
  "/register",
  wrapAsync(async (req, res, next) => {
    const name="";
    const email="";
    
    res.render("register", {name,email});
  })
);

router.post(
  "/register",
  wrapAsync(async (req, res, next) => {
    try {
      const {name,email,password,password2} = req.body;
      if (password != password2) {
        // errors.push({ msg: 'Passwords do not match' });
      return res.render("register",{name,email,password,password2});
      }
      if (password.length < 6) {
        return res.render("register",{name,email,password,password});
      } 

    
      const user = new User({ name,username:email,email });
      const registeredUser = await User.register(user, password);

       if(typeof registeredUser!="undefined"){ 

      //  const token=jwt.sign({name,email,password},process.env.JWT_ACC_ACTIVATE,{expiresIn:"20m"})

      //   let transporter = nodemailer.createTransport({
      //    service:"hotmail",
      //     auth: {
      //       user: "codetofun@outlook.com", // generated ethereal user
      //       pass: "node@1234", // generated ethereal password
      //     },
      //   });
      
      //   // send mail with defined transport object
      //   let info = await transporter.sendMail({
      //     from: '"Balajee👻" <codetofun@outlook.com>', // sender address
      //     to: email, // list of receivers
      //     subject: "NewsLetter", // Subject line
      //     text: "Hello world love you.....love ", // plain text body
      //     html: `click here to verify <br> <a href="http://localhost:3000/login">${token}</a>` // html body
      //   });
      //   req.flash("success", "we have sent an email to you please verify it, it's you");
        res.redirect("/login");
      }
      else{
        res.redirect("/register");
      }
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);
router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true, 
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "welcome back!");
       const redirectUrl ="/dashboard";
      // const redirectUrl ="/result";
      delete req.session.returnTo;
      res.redirect(redirectUrl);
    }
);
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You have Logged out successfully!");
  res.redirect("/login");
});
module.exports = router;