import express from "express";
import User from "../User.js";
import { body,validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = "SomeBigTextToCreateHighSecurityPassword"
const router = express.Router();

router.post("/createuser",[
    body('email',"Enter a valid Email").isEmail(),
    body("name").isLength({min:3}),
    body("password","Incorrect Password").isLength({min:5})],
    async (req,res) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors: error.array()})
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt);

    try{
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });
    res.json({success:true});
    }
    catch(error){
        res.json({success:false});
        console.log(error);
    }
})

router.post("/loginuser",[
    body('email',"Enter a valid Email").isEmail(),
    body("password","Incorrect Password").isLength({min:5})],
    async (req,res) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors: error.array()})
        }
        let email = req.body.email
    try{
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors: "Incorrect Creds"})
        }
        let pwdCompare = await bcrypt.compare(req.body.password,userData.password);
        if(!pwdCompare){
            return res.status(400).json({errors: "Incorrect Creds"})
        }
    const  data = {
        user :{
            id:userData.id
        }
    }

    const authToken = jwt.sign(data,jwtSecret)
    return res.json({Success:true,authToken:authToken});
    }
    catch(error){
        res.json({success:false});
        console.log(error);
    }
})


export default router;