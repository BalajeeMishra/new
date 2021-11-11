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
const multer = require('multer')
var done;
// const multerStorage= multer.diskStorage({
//   destination:(req,file,cb)=>{
//      cb(null,"public"); 
//   },
//   filename: (req, file, cb) => {
//    const fileName = file.originalname.toLowerCase().split(' ').join('-');
//    cb(null,fileName);
//    // const ext =file.mimetype.split("/")[1];
//    // cb(null, `files\admin-${file.fieldname}-${Date.now()}.${ext}`);
//  }
// });



// const upload = multer({
// storage: multerStorage,
// fileFilter: (req, file, cb) => {
//    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
//        cb(null, true);
//    } else {
//        cb(null, false);
//        return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
//    }
// }
// });


router.get("/",isLoggedIn,isAdmin,(req,res)=>{
  res.send("result uploaded successfully...");
});

router.get(
    "/student",isLoggedIn,isAdmin,
    wrapAsync(async (req, res, next) => {
      res.render("adminrelated/fillinformation");
    })
  );
  router.post("/student",isLoggedIn,isAdmin,wrapAsync(async(req,res,next)=>{
    done=req.body
    
    res.redirect("/result/detail");
  }));

  router.get("/detail",isLoggedIn,isAdmin,async(req,res)=>{
    
  var selected_student=await Detail.find(done);
  console.log(selected_student);
  res.render("adminrelated/aboutstudent",{selected_student});
  });
  router.get("/markfillup/:id",isLoggedIn,isAdmin,async(req,res)=>{
        
        res.render("adminrelated/studentmarkfillup",{
          id:req.params.id
        });
  });
  router.post("/markfillup/:id",isLoggedIn,isAdmin,async(req,res)=>{
   
    const arrayObj=[];
    for(var i in req.body){
      arrayObj.push({key:i,val:req.body[i]});
    }
    // arrayObj=[req.body];
    // console.log(arrayObj);
    // const result = arrayObj.map((value,i) => {
    //   let [key, val] = Object.entries(value)[i];
    //   return {key, val}
    // });
    const newMark= new Mark({userId:req.params.id});
    newMark.markDetail=await arrayObj.map(f => ({ subject: f.key, mark: f.val }));
    await newMark.save();
    Detail.findOneAndUpdate({userId:req.params.id}, {"resultShow":true}, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      
      return res.redirect("/result/detail");
  });
 
    // console.log(update)
    // req.flash("success", "Result added successfully!")
});

router.get("/delete-result/:id",isLoggedIn,isAdmin, wrapAsync(async (req, res, next) => {
  // const { id } = req.params;
  const result=await Mark.find({userId:req.params.id});
  console.log(result[0]);
  console.log(result[0]._id);
  const deletedResult = await Mark.findByIdAndDelete(result[0]._id);
  Detail.findOneAndUpdate({userId:req.params.id}, {"resultShow":false}, {upsert: true}, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.redirect("/result/detail");
});
}));
  

module.exports=router;