import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connecttoDB from './DB/db.js';
import userRouter from './Routes/user.routes.js'
import cookieParser from 'cookie-parser';
dotenv.config();
const app=express();
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(urlencoded({extended:true}));

connecttoDB();

app.get("/",(req,res)=>{
    res.send("hello there");
})

app.use("/users",userRouter)

export default app