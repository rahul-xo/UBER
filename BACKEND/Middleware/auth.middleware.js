import jwt from 'jsonwebtoken'
import userModel from '../Models/user.model.js';
import blacklistTokenModel from '../Models/blacklistToken.model.js';
import captainModel from '../Models/captain.model.js';
export const authUser=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if(!token) return res.status(401).json({message:"Unauthorized user"});

    const isBlackListed=await blacklistTokenModel.findOne({token})
    if(isBlackListed) return res.status(401).json({message:"Already Logged Out"});

    try {
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded._id);

        req.user=user;
        return next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorized user"});
    }
}

export const authCaptain=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token) return res.status(401).json({message:"Unauthorized"})

    const isBlackListed=await blacklistTokenModel.findOne({token});
    if(isBlackListed) return res.status(401).json({message:"Unauthorized"});
    
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const captain=await captainModel.findById(decoded._id);
        req.captain=captain
        return next();
    } catch (error) {
        res.status(401).json({message:"Unauthorized"});
    }
}