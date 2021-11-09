var express = require('express');
var router = express.Router();
const meet = require('./../model/meeting') ;
const mongoose = require('mongoose') ;
const check = require('../util/checkingAuth') ; 
const multer = require('multer') ;
const user = require('../model/user') 

router.get('/',check , async(req,res)=>{
const meets = await meet.find() ;
res.render('meet_home',{meetings : meets , user_id : req.user.id}) ;
})
const image_filter = (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == 'image/png' || file.mimetype == "image/jpeg") {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }

router.get('/enter/:meet_id',check, async(req,res)=> {
  const meeting = await meet.findById(req.params.meet_id) ; 

if(meeting === null) {
return res.end('Meeting is not available') ;
}

   const link = 'https://meet.jit.si/' + req.params.meet_id ;  
    res.redirect(link) ; 
}) ;



router.get("/new_meeting", check , (req,res)=> {
res.render('new_meet') ; 
})

router.post("/new_meeting" ,multer({dest : 'public/meetings' , fileFilter : image_filter}).single('image') , async (req,res)=> {
    const publisher_id = req.user.id ;  
    const publisher_username = (await user.findById(req.user.id)).username ; 
    const image = req.file.filename  ; 
    const description = req.body.description ; 
    const subject = req.body.subject ; 
    const duration = req.body.duration  ;
    const meeting  = new meet({subject : subject , publisher_id : publisher_id, publisher_username : publisher_username ,image : image ,description : description , duration : duration }) ; 
    await meeting.save() ; 
    res.redirect('/meet')  ;
})


router.delete('/delete/:meet_id' ,check , async(req,res)=> {
  const meeting  = await meet.findById(req.params.meet_id) ; 
  if (meeting.publisher_id == req.user.id ) {
    await meet.findByIdAndDelete(req.params.meet_id) ; 
   return res.redirect('/meet')   
  }
  res.end('You are not authorized to delete this meeting') ; 
})
module.exports = router ;