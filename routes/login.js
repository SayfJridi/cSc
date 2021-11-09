
var express = require('express');
const user = require('../model/user');
var router = express.Router();
var passport = require('passport'); 
const bcrypt = require('bcrypt') 
router.get('/', (req,res) => {

    if (!req.isAuthenticated()) {
        const errors = req.flash().error || [""]  ;
        console.log(errors) ; 
   return res.render('login' , {errors}) ;
    }
    res.redirect('/')  ;    
}) ; 

router.post('/', passport.authenticate('local', {
    failureFlash : true , 
    failureRedirect: '/sign'
}), (req,res) => { 
    res.redirect('/') ;
});



router.post('/sign_up' ,async(req ,res) => {
    const password = await bcrypt.hash(req.body.password , 10) ; 
    const new_user = new user({ username : req.body.username , password : password , facebook_add : req.body.facebook_add , phone : req.body.phone }) ;    
    await new_user.save() ;
    res.redirect('/') ;
})
module.exports = router;
