import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
   name:{type:String,required:true,unique:true},
   description:{type:String},
   Website:{type:String},
   location:{type:String,},
   logo:{type:String},//url on cloudnary
   userId:{type:mongoose.Schema.ObjectId,
            ref:"User",
            required:"true"

   }
},{timestamps:true})
const Company = mongoose.model("Company",companySchema);
export default Company; 