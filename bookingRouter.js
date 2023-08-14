const express=require('express');
const bookingRouter=express.Router();
const { protectRoute } = require("../controller/authController");
const { createSession }=require('../controller/bookingController');
bookingRouter.post('/createSession',protectRoute)
bookingRouter.get('/createSession',function(req,res){
   res.sendFile("/Users/himanshi/Desktop/1frontend/backend/foodApp/booking.html")
});
module.exports=bookingRouter;