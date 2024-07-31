const {Router}=require("express")
const userRouter=Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require("../model/userModel");

userRouter.post('/register',(req,res)=>{
    const {email,password,username}=req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(err){
                res.status(505).json({message:"Error While Hasing the Password"})
            }else{
                const user=new userModel({email,username,password:hash})
                await user.save()
                res.status(201).json({message:"User Registeration Successfully"})
            }
        });
    } catch (error) {
        res.status(505).json({message:"Something Wents Wrong"})
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                if(result){
                    const token = jwt.sign({ userId: user._id ,user:user.username}, 'masai');

                    res.status(201).json({message:"User Login Successfully",token})
                }else{
                    res.status(505).json({message:"Password is Incorrect"})

                }
            });
        }else{
            res.status(505).json({message:"Please Register First"})
        }
    } catch (error) {
        res.status(505).json({message:"Something Wents Wrong"})
    }
})

module.exports=userRouter