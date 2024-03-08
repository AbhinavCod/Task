import express from "express";
import User from "../models/auth";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/login",async (req,res)=>{
    const {username,password} = req.body;

    try {
        let user = await User.findOne({username});

    if(!user){
        return res.status(400).json({message:"Invalid Credentials"});
    }

    const isMatch  = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({message:"Invalid Credentials"});
    }

    return res.status(200).json({userId:user._id});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Invalid Credentials"});
    }
});


router.post("/register",async (req,res)=>{
    const {email,username,password,confirmPassword} = req.body;

    try {
        if(password !== confirmPassword){
            return res.status(400).json({message:"Invalid Data"});
        }
    
        let user = await User.findOne({email:email});
    
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        user = new User(req.body);
        await user.save();

        return res.status(200).json({message:"User registered successfully"});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Invalid Credentials"});
    }

});


router.post("/forgot-password", async (req,res)=>{
    const {email,oldPassword,newPassword} = req.body;

    try {
        let user = await User.findOne({email:email});

        if(!user){
            console.log("here");
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(oldPassword,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const hashedPassword = await bcrypt.hash(newPassword,8);

        const newUser = await User.findOneAndUpdate({email:email},{$set:{password:hashedPassword}},{new:true});

        return res.status(200).json({message:"Updated Successfully"});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Invalid Credentials"});
    }
})


export default router;