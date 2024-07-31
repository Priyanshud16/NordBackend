const {connect}=require("mongoose")
const dotenv=require("dotenv").config()

const ConnectDB=connect(process.env.MONGOURL)

module.exports=ConnectDB