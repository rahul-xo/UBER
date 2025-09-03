import express from 'express'
const router=express.Router();
import {body} from 'express-validator'
import { captainProfile, loginCaptain, logoutCaptain, registerCaptain } from '../Controller/captain.controller.js';
import { authCaptain } from '../Middleware/auth.middleware.js';

router.post("/register",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be 3 character long'),
    body('password').isLength({min:6}).withMessage('length should be 6 character long '),
    body('vehicle.color').isLength({min:3}).withMessage('minimun length should be 3'),
    body('vehicle.plate').isLength({min:3}).withMessage('minimun length should be 3'),
    body('vehicle.capacity').isInt({min:1}).withMessage('minimun capacity should be 1'),
    body('vehicle.vehichleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type'),


],registerCaptain)

router.post("/login",[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('password must be atleast 5 character long')
],loginCaptain)

router.get("/profile",authCaptain,captainProfile);

router.get("/logout",authCaptain,logoutCaptain);

export default router