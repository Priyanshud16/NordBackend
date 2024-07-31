const {Schema,model}=require("mongoose")

const userSchema=new Schema({
    username:{required:true,type:String},
    email:{required:true,type:String},
    password:{required:true,type:String}
},{versionKey:false})

const userModel=model('userModel',userSchema)

module.exports=userModel