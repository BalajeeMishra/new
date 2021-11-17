const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const shortid = require('shortid');
const Dues=require("../models/dues");
let order_id_variable;
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
		  console.log(order);
		res.json(order);
})
})

router.post("/is-order-complete",async(req,res)=>{
	razorpay.payments.fetch(req.body.razorpay_payment_id)
	.then((paymentDocument)=>{
		console.log(paymentDocument);
		if(paymentDocument.status=="captured"){
			const amount=paymentDocument.amount;
			Dues.findOneAndUpdate({userId:req.user._id}, {"feesDetail[0].paided":amount,"feesDetail[0].dues":feesDetail[0].total-feesDetail[0].amount}, {upsert: true}, function(err, doc) {
				if (err) return res.send(500, {error: err});
				
				return res.send("success");
			});
		};
		return res.send("cancel");
	})

})


module.exports = router;
