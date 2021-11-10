const mongoose=require("mongoose");
const SubjectSchema=new mongoose.Schema({
    markDetail:[
        {
        subject:String,
        mark:Number,
        _id:false
        }

    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
  
});
const Mark=mongoose.model("Mark",SubjectSchema);
module.exports=Mark;