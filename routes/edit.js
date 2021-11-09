var express = require('express');
var router = express.Router();
const passport = require('passport') ;
const mongoose = require('mongoose') ;  
const bcrypt = require('bcrypt') ; 
const user = require('./../model/user') ; 


router.get('/', async(req,res)=> {


    res.render('edit')  ;
})

router.put('/:id' ,async(req,res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/') ; 
    }
    
    const result = findOne({id : req.user.id}) ; 
    const hash = bcrypt(req.body.password, 10)  ; 
    await findByIdAndUpdate(req.user.id,{username : result.username , password : hash  , facebook_add : req.body.add , phone : req.body.phone})  ; 
    res.redirect('/') ; 
})

module.exports = router