require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose') ; 
const session = require('express-session') ;
const flash = require('connect-flash') ; 
const bcrypt = require('bcrypt') ;  
const methodeOverride = require('method-override') ;
const post = require('./model/post') ; 

var MongoDBStore = require('connect-mongodb-session')(session)
var passport = require('passport');
var  LocalStrategy = require('passport-local').Strategy;
var indexRouter = require('./routes/index');
const login_router = require('./routes/login') ;
const user_router = require('./routes/users') ; 
const edit_router = require('./routes/edit') ;
const meet_router = require('./routes/meet') 
const user  = require('./model/user') ; 
const admin_router = require('./routes/admin.js') ; 
var app = express();
app.listen(9600)  ;


 
var store = new MongoDBStore({
  uri: process.env.URI,
  collection: 'mySessions'
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  saveUninitialized : false   , resave : false  , secret : 'Secret' ,cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
}))
app.use(methodeOverride("_method"));


app.use(flash()) ;  
// Database connection 
mongoose.connect(process.env.URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})
.then((result)=> {console.log("connected :) :) ")})
.catch((err) => {console.log(err)})



app.use(passport.initialize()) ;
app.use(passport.session()) ;

passport.use(new LocalStrategy({passReqToCallback : true},
  async function (req ,username, password, done) {
    await user.findOne({ username: username }, async function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        
        return done(null, false, req.flash('error','Incorrect username.'));
      }
    if (!(await bcrypt.compare(password,user.password))) {
        return done(null, false, req.flash('error', 'Incorrect password.'));
      }
      return done(null, user);
    });
  }
));
passport.serializeUser(function(user, done) {
 
  done(null, user.id,user.username);
});
passport.deserializeUser((id,done) => {
  done(null,{id}) ;
})

const check = (req,res) => {
  if (!req.isAuthenticated()) {
    req.flash('error','You Need to log in to access that part') ;
    return res.redirect('/sign') ; 
  }

  next() ; 
}

app.use('/meet',meet_router)
app.use('/edit', edit_router)
app.use('/',indexRouter);
app.use('/sign' , login_router) ;
app.use('/user',user_router) ;
app.use('/admin',admin_router) ; 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).render('404') ; 
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
