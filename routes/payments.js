const express = require("express");
const router = express.Router();
const paypal = require("paypal-rest-sdk");
const Detail = require("../models/Detail");
const {isLoggedIn}=require("../middleware");
const {isAdmin}=require("../middleware");
const AppError = require("../controlError/AppError");
const wrapAsync = require("../controlError/wrapasync");
const User=require("../models/user");
const Mark=require("../models/studentadminside");
const Dues=require("../models/dues");
const MonthlyPlan=require("../models/monthly");
var fees=0;
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: 'AaDj1YMVe67NhG_QpfHP9gHqAFkk39joVHT6FXvPYWdJv91gbARHR-zq55BIYjVGY2ElUzo5F77EHo7l',
  client_secret: 'EMz97ri2AOTA06J4SIcORBpaQK4FrZOYI9RvLKLlwuzNO6dnpUY5L5O05gbaQGrX2xdls9UqIgTVny1G',
});

router.get("/success", (req, res) => {
 
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total:"8.00",
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async (error, payment) => {
      console.log("done",payment);
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        // await Cart.deleteMany({});
        // req.flash("success", " order placed ");
        res.send("success")
      }
    }
  );
});

router.post("/pay", async(req, res) => {
  console.log(req.body);
  fees= req.body.paided;
  //  console.log(typeof fees);
  
//  var fees;
//  const paiddnow=req.body.paided;
//   const nameDetail= await Detail.find({userId:req.user._id});
//   const standard= nameDetail[0].classofs;
//   const monthlyplan=await MonthlyPlan.find({});
//   const monthly=monthlyplan[0].monthly;
//     // const newPayment=await Dues.find({userId:req.u});
//     monthly.forEach(e => {
//         if(e.class==standard){
//              fees=e.fees;
//         }
//     });

//   const arrayObj=[req.body];
//   const newDuesPage=new Dues({userId:req.user._id,name:req.user.name});
//   console.log(newDuesPage);
//   const dues=fees-paiddnow;
//   newDuesPage.feesDetail=await arrayObj.map(f => ({paided: f.paided }));
//   await newDuesPage.save();


  
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url:
        process.env.RETURN_URL || "http://localhost:3000/success",
      cancel_url:
        process.env.CANCEL_URL || "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Red Sox Hat",
              sku: "001",
              price: "8.00",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total:"8.00",
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {

    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

router.get("/cancel", (req, res) => {
//   req.flash("error", "payment cancelled try again");
//   res.redirect("/");
    res.send("done");
});
module.exports = router;
