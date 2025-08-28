import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
const app=express();
app.use(cors());

app.use(express.json());
app.use(urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("hello there");
})

export default app