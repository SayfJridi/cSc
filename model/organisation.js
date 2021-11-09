

const mongoose = require('mongoose') ; 

const slugify = require('slugify') ; 



const org_schema = new mongoose.Schema({

    name : {
        required : true , 
        type : String  , 
        unique  : true 
    },

    createdAt : {
        type : String , 

        required : true , 

        unique : true
    },


    description : {
        type : String , 
        required : true , 
    }, 
    joinedAt : {
        type : Date  , 
        required : true  , 
        default : true , 
    },
    slug : {
    
        required: true , 
        type : string ,
        default : slugify(this.title,{lower : true})  
    }
})


module.exports = mongoose.model('organisation',org_schema) ;  

