const mongoose=require("mongoose");
const RegistrationSchema=new mongoose.Schema({
      status:{
          type:Boolean,
          default:false,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
      registrationNumber:{
          type:String,
          unique:true,
      },
    },
    {
        timestamps: true
      }
    );

const RegistrationStatus=mongoose.model("RegistrationStatus",RegistrationSchema);
module.exports= RegistrationStatus;