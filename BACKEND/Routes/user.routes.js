import express from 'express'
import { body } from 'express-validator'
import { registerUser } from '../Controller/user.controller.js';
const router=express.Router();


router.post("/register",[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be 3 character long'),
    body('password').isLength({min:5}).withMessage('password must be 5 character long')
],registerUser)

export default router 