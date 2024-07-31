const express=require("express")
const ConnectDB = require("./config/db")
const cors=require("cors")
const userRouter = require("./Router/Router")
const app=express()
const dotenv=require("dotenv").config()
app.use(cors())
app.use(express.json())

app.use("/user",userRouter)
app.get('/',(req,res)=>{
res.send("This is our Home Route")
})

app.listen(process.env.PORT,async()=>{
    try {
        await ConnectDB
        console.log("Server Is Running and DB is Connected");
    } catch (error) {
        
    }
    
})