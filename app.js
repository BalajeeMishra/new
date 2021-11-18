require("dotenv").config();
  const express = require("express");
  const path = require("path");
  const mongoose = require("mongoose");
  const session = require("express-session");
  const MongoDBStore = require("connect-mongo");
  const flash = require("connect-flash");
  const AppError = require("./controlError/AppError");
   const cors=require("cors");
  var pdf = require('html-pdf');
  
  const methodOverride = require("method-override");
  const passport = require("passport");
  const LocalStrategy = require("passport-local");

  //importing models and routes
  const User = require("./models/user");
  const Users = require("./routes/user");
  const Detail= require("./routes/detail");
  const Result= require("./routes/result");
  const payment = require("./routes/payment");
  const dues=require("./routes/dues");
  const payments = require("./routes/payments");
  const feesofstudent=require("./routes/feesofstudent");

  //mongoose connect
  mongoose
  .connect("mongodb://localhost:27017/school", {
    useNewUrlParser: true,
        useUnifiedTopology: true,
        
  })
  .then(() => {
    console.log("connection open");
  })
  .catch((err) => {
    console.log(err);
  });
  const app = express();


  //middleware
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.static(__dirname + "/public"));
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(methodOverride("_method"));
  app.use(cors());
  

  //storing session in mongoose
  const store = new MongoDBStore({
    mongoUrl:"mongodb://localhost:27017/school",
    secret: "thisshouldbeabettersecret!",
    touchAfter: 60
  });
  
  store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
  });

  //sessionconfiguration
  const sessionConfig = {
    store,
    secret: "thisshouldbeabettersecret!",
    resave: false,
    saveUninitialized: true, 
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  };
  
  app.use(session(sessionConfig));
  app.use(flash());

  //using passport
app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, User.authenticate()));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  }); 

  //middleware to storing local data....
  app.use((req, res, next) => {
     res.locals.currentUser = req.user||false;
    res.locals.success = req.flash("success")||false;
    res.locals.error = req.flash("error")||false;
    next();   
  });
 
  //routes part.
  app.use("/", Users);
  app.use("/detail", Detail);
  app.use("/result",Result);
  app.use("/", payment);
  app.use("/dues",dues);
  app.use("/payment", payments);
  app.use("/student",feesofstudent);

// error handling with middleware
  const handleValidationErr = (err) => {
    return new AppError("please fill up all the required field carefully", 400);
  };
  
  app.use((err, req, res, next) => {
    console.log(err);
    if (err.name === "ValidationError") err = handleValidationErr(err);
    next(err);
  });
  
  app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    console.log(err);
    if (err) {
      res.status(statusCode).render("error", { err });
    }
  });
  
  const PORT = process.env.PORT || 3000;
  
  //listening
  app.listen(PORT, () => {
    console.log("APP IS LISTENING ON PORT");
  });
  