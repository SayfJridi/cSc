var express = require('express');
const user = require('../model/user');
var router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const check = require('../util/checkingAuth');




router.get('/organisation', (req, res) => {
  res.render('orga');
});

router.get('/posts', async (req, res) => {

  res.render('blog');
});


/* GET home page. */
router.get('/', async (req, res, next) => {

  var curr_user = new user();

  const picture_error = req.flash().picture_error || [''];

  if (req.isAuthenticated()) {
    curr_user = await user.findOne({
      _id: req.user.id
    });
    console.log(curr_user);
  }
  res.render('index', {
    auth: req.isAuthenticated(),
    picture_error,
    user: curr_user
  });
});

router.get('/logout', (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();

  }
  res.redirect('/');

});

router.get('/about', (req, res) => {
  res.render('csc');
})
router.get('/organisation', (req, res) => {
  res.render('orga');
});


var profile_pic_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profile_pics')
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id)
  }
});
const image_filter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == 'image/png' || file.mimetype == "image/jpeg") {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

router.put('/change_profile_pic', multer({
  storage: profile_pic_storage,
  filefilter: image_filter 
}).single('profile_pic'), async (req, res) => {
  const curr_user = await user.findOne({
    _id: req.user.id
  });
  curr_user.profile_pic = req.file.filename;
  console.log(curr_user);
  await curr_user.save();
  res.redirect('/');
});

router.get('/edit_profile', check, (req, res) => {
  return res.render('edit_home');

});

router.get('/edit_profile/password', check, (req, res) => {
  const password_errors = req.flash().password_errors || [];

  return res.render('edit_password', {
    password_errors
  });
})
router.put('/edit_profile/password', async (req, res) => {
  const userr = await user.findById(req.user.id);
  const curr = req.body.current;
  const new_pass = req.body.new;
  console.log(curr);
  if (!bcrypt.compareSync(curr, userr.password)) {
    req.flash('password_errors', 'Current Password is Wrong');
    return res.redirect('/edit_profile/password');
  }
  userr.password = await bcrypt.hash(new_pass, 10);
  await userr.save();
  res.redirect('/')
})

router.get('/edit_profile/username', check, async (req, res) => {
  const username_errors = req.flash().username_errors || [''];

  res.render('edit_username', {
    username_errors,
    user: await user.findById(req.user.id)
  });

})

router.get('/users', async (req, res) => {

  const users = await user.find();
  res.render('Users', {
    users
  });
})

router.put('/edit_profile/username', async (req, res) => {

  const username_new = req.body.username;
  const password_user = req.body.password;

  const userr = await user.findById(req.user.id);

  if (!bcrypt.compareSync(password_user, userr.password)) {

    req.flash('username_errors', 'Password Is Wrong');
    return res.redirect('/edit_profile/username');
  }

  userr.username = username_new;
  await userr.save();
  res.redirect('/');

});

router.get('/users/:id', async(req, res) => {
  const userr = await user.findById(req.params.id) ; 

  console.log(userr) ;

  res.render('profil', {user : userr});
})


module.exports = router;