


const check = (req,res,next) => {
    if (!req.isAuthenticated()) {
      req.flash('error','You Need to log in to access that part') ;
      return res.redirect('/sign') ; 
    }
    next() ; 
  }

  module.exports = check ; 