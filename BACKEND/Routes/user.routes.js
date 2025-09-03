import express from 'express'
import { body } from 'express-validator'
import { getUserProfile, loginUser, logoutUser, registerUser } from '../Controller/user.controller.js';
import { authUser } from '../Middleware/auth.middleware.js';
const router=express.Router();


router.post("/register",[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be 3 character long'),
    body('password').isLength({min:5}).withMessage('password must be 5 character long')
],registerUser)


router.post("/login",[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('password must be atleast 5 character long')
],loginUser)

router.get("/profile",authUser,getUserProfile)

router.get("/logout",authUser,logoutUser)
export default router 