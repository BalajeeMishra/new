const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const shortid = require('shortid');
const Dues=require("../models/dues");
let order_id_variable;
var sessData;
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


var razorpay = new Razorpay({
  key_id: 'rzp_test_OPoBXNxk6Zaego',
  key_secret: 'zN3Fnv7AZ3pahjdQklYGTPA8',
});
router.post('/order', async (req, res) => {
	const {data}=req.body;
	var options = {
		amount: data.paided,  // amount in the smallest currency unit
		currency: "INR",
	  };
	  razorpay.orders.create(options, (err, order)=> {
		res.json(order);
})
})

router.post("/is-order-complete",async(req,res)=>{
	const duesDetail=await Dues.find({userId:req.user._id});
	const comment_id=duesDetail[0].feesDetail[0]._id;
	const total=duesDetail[0].feesDetail[0].total;
	const youhvtpft=duesDetail[0].feesDetail[0].total; //you have to pay for current month
	const totalpaidedyet=duesDetail[0].feesDetail[0].totalpaidedyet;
	razorpay.payments.fetch(req.body.razorpay_payment_id)
	.then((paymentDocument)=>{
		if(paymentDocument.status=="captured"){
			sessData = req.session;
	        sessData.count = 1;
			const amount=paymentDocument.amount;
			const valuetoenter=total-(amount/100);
			Dues.update({'feesDetail._id': comment_id},
{'$set': {
       'feesDetail.$.total': valuetoenter,
	   'feesDetail.$.dues':valuetoenter,
	   'feesDetail.$.paided':amount/100,
	   'feesDetail.$.valuetopaid':0,
	   'feesDetail.$.totalpaidedyet':totalpaidedyet+amount/100,
 }},
    function(err,model) {
     if(err){
      return res.send(err);
  }
});
return res.send("success");

		};
		return res.send("cancel");
	})
})
module.exports = router;
