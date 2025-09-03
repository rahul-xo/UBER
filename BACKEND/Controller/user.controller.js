import { validationResult } from "express-validator";
import userModel from "../Models/user.model.js";
import { createUser } from "../Services/user.service.js";
import blacklistTokenModel from "../Models/blacklistToken.model.js";

export const registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });

  const { fullname, email, password } = req.body;
  
    const isExist=await userModel.findOne({email});
    if(isExist) return res.status(400).json('User Already Exist');

  const hashedPassword = await userModel.hashPassword(password);

  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateToken();
  res.status(201).json({ token, user });
};

export const loginUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user)
    return res.status(401).json({ message: "Invalid email or password." });

  const isUser = await user.comparePassword(password);
  if (!isUser)
    return res.status(401).json({ message: "Invalid email or password" });

  const token=user.generateToken();
  res.cookie("token",token);

  res.status(200).json({token,user});
};

export const getUserProfile=(req,res,next)=>{
  res.status(200).json(req.user);

}

export const logoutUser=async (req,res)=>{
  const token= req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
  
  res.clearCookie('token')
  await blacklistTokenModel.create({token});
  res.status(200).json({message:"logged Out"})
}