import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, " firstname must be atleast 3 character long"],
    },
    lastname: {
      type: String,
      minlength: [3, "lastname must be atleast 3 character long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email", 
    ],
  },
  password:{
    type:String,
    required:true,
    select:false
  },
  socketId:{
    type:String
  },
  status:{
    type:String,
    enum:['active','inactive'],
    default:'inactive'
  },
  vehicle:{
    color:{
        type:String,
        required:true,
        minlength:[3,'atleast 3 character required']
    },
    plate:{
        type:String,
        required:true,
        minlength:[3,'plate number must be 3 character long']
    },
    capacity:{
        type:Number,
        required:true,
        minlength:[1,'capacity must be 1 or greater']
    },
    vehicleType:{
        type:String,
        enum:['car','motorcycle','auto'],
        required:true
    }
  },
  location:{
    lat:{
        type:Number
    },
    lng:{
        type:Number
    }
  }
});

captainSchema.methods.generateToken= function (){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token;
}
captainSchema.methods.comparePassword=function(password){
    return bcrypt.compare(password,this.password);
}
captainSchema.statics.hashPassword=function(password){
    return bcrypt.hash(password,10);
}

const captainModel=mongoose.model("captain",captainSchema);
export default captainModel