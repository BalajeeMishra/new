
const mongoose = require("mongoose");
const DetailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},
classofs:{
    type:String,
    required:true
},
   age : {
        type: String,
        required:true
    },
   gender : {
     type : String,
     required:true
    } ,
    birthday: {
     type : Date,
     required:true
    } ,
    address:{
      type:String
    },
    mobno:{
     type:String,
     required:true
 },
 
     
});
const Detail = mongoose.model('Detail', DetailSchema);
module.exports = Detail;