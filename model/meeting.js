const mongoose = require('mongoose')
const slugify = require('slugify')

const meeting_schema = new mongoose.Schema({

    subject: {
        required: true,
        type: String
    },
    publisher_id : {
        type : String  , 
        required : true 
    },  
    publisher_username :{
        type : String , 
        required : true
    } , 
    date: {
        type: Date,
        default: new Date() 
    },
    description : {
        type : String , required: true
    } , 
    image : { 
        type : String  , required : true 
    },
    duration : {
        type : Number , 
        required : true 
    }
})

module.exports = mongoose.model("meeting", meeting_schema)