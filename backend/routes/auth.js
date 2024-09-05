const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

// Register
router.post("/register",async(req,res)=>{
    try{
        const {username,email,password}=req.body
        // to check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already taken' });
        }

        // Check if the email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ message: 'Email already registered' });
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser=new User({username,email,password:hashedPassword})
        const savedUser=await newUser.save()
        res.status(200).json(savedUser)

    }
    catch(error){
        res.status(500).json(error);
    }
})

// Login
router.post("/login",async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json("User not found!")
        }
        const match=await bcrypt.compare(req.body.password,user.password)
        
        if(!match){
            return res.status(401).json("Wrong credentials!")
        }
        // res.status(200).json("success")
        // Generating JWT token if it is correct
        const token=jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"3d"})
        const {password,...info}=user._doc
        res.cookie("token",token,{sameSite:"none",secure:true}).status(200).json(info)

    }
    catch(error){
        res.status(500).json(error);
    }
})

// Logout
router.get("/logout",async (req,res)=>{
    try{
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!")

    }
    catch(err){
        res.status(500).json(err)
    }
})

router.get("/refetch", (req,res)=>{
    const token=req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})

module.exports=router