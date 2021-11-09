var express = require('express');
var router = express.Router();
const user = require("./../model/user")
const mongoose = require('mongoose') ; 

/* GET users listing. */
router.get('/:id', async function(req, res, next) {
  const search = await user.findOne({_id : req.params.id}).catch((erreur) => {return res.send('User not found')}) ; 
  res.render('profil', {user : search}) ;
});



module.exports = router;
