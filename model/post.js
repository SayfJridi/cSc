const mongoose = require('mongoose')
const slugify = require('slugify')


const post_schema = new mongoose.Schema({

    title: {
        required: true,
        type: String
    },

    publisher_id : {
        type : String  , 
        required : true 
    },   
    
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date() 
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    }
})

post_schema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { strict: true, lower: true })
    }
    next();
})
module.exports = mongoose.model("post", post_schema)