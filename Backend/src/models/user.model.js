const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username : {
        type : String , 
        unique : [ true , "username already taken"],
        required : true
    },
    email : {
        type : String,
        unique : [ true , "email already taken"],
        required : true,
        lowercase : true
    },


    passsword :{
        type : String , 
        required : [ true, "password is required"],
    }
})


module.exports = mongoose.model("User", userSchema)