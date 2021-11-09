const mongoose=require("mongoose");
const SubjectSchema=new mongoose.Schema({
    markDetail:[
        {
        subject:String,
        mark:Number,
        }

    ],
});
const MarkDetail=mongoose.Model("MarkDetail",SubjectSchema);
module.exports=MarkDetail;