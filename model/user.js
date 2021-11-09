
const mongoose = require('mongoose')
const user_schema = new mongoose.Schema({

    username : {required : true  , type : String , default : "default username"}
    , 
    password : {
        required : true  , type : String 
    } ,
    facebook_add : {default : '' ,type : String },
    phone : {type : String , default :'' } ,
    profile_pic : { 
        type : String , default : "default.png"
    } ,
    joined : {
        type : Date,
        default : new Date() }
    
})


    

 

module.exports = mongoose.model("User", user_schema) 