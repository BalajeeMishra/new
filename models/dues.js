const mongoose = require("mongoose");
const DuesSchema=new mongoose.Schema({
    fees:[
        {
        month:String,
        status:Boolean,
        dues:Number,
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