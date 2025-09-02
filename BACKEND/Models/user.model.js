import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema=mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'first name must be atlest 3 character.']
        },
        lastname:{
            type:String,
            minlength:[3,'last name must be 3 character']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'email must be 5 character long']
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    }
})

userSchema.statics.hashPassword= async (password)=>{
 return await bcrypt.hash(password,10)
}

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateToken= function(){
    const token= jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token;
}

const userModel=mongoose.model("user",userSchema);

export default userModel