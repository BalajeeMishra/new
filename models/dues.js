const mongoose = require("mongoose");
const month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

const d = new Date();
var name = month[d.getMonth()];
const DuesSchema=new mongoose.Schema({
    feesDetail:[
        {
        month:{
            type:String,
            default:name
        },
        status:{
            type:Boolean,
            default:false
        },
        dues:{
          type : Number,
          default:0
        },
        paided:{
             type:Number,
             default:0,
        },
        valuetopaid:{
            type:Number,
            default:0,
        },
        _id:false
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // pdf_path:{
    //     type:String,
    //     default:"",
    // },
    name:{
        type:String,
        // required:true
    }
  
});
const Dues=mongoose.model("Dues",DuesSchema);
module.exports=Dues;