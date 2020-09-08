const express = require('express')
 const router = express.Router()



 //test///////////////////
 const test1 = 'test1'
 const num = 'test num'
 

 
 router.get('/',(req,res)=>{
     res.render('test')
 })
  
 
 //test//////////////////////////////////////




module.exports = router 