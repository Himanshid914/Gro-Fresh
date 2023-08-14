const express=require('express');
const authRouter=express.Router();
const userModel=require('../models/userModel'); 
const jwt=require('jsonwebtoken');
const JWT_KEY=require('secrets.js');
authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)  //here 1st middleware function run and then move to getsignup function (next());move in sequence 
.post(postSignUp);

authRouter
.route('/login')
.post(loginUser)

function middleware1(req,res,next){  ///just show how middleware show 
    console.log('middleware encountered');
    next();    // this will callnext function which is getsignup page
}
function middleware2(req,res){  /// koe next command nhi h so here req/res cycle end hogaye
    console.log('middleware2 encountered');
    console.log('middleware2 ended req/res cycle');
    res.sendFile('/public/signup.html',{root:__dirname});
}
function getSignUp(req,res,next){
    console.log('getsignup called');
    next();
    //res.sendFile('/public/signup.html',{root:__dirname}); 
}
async function postSignUp(req,res){ 
    let dataObj=req.body;
    let user=await userModel.create(dataObj);
    //console.log('backend',obj);
    res.json({
    message:"user is signed up",
    data:obj
    });
};
async function loginUser(req,res){
    try{
     let {email,password}=req.body;
     if(data.email){// for seurity
         let user=  await userModel.findOne ({email:data.email})   ;
         //bycrpt -->compare
         if(user){
                  if(user.password==data.password){
                      let uid=user['_id']; //uid 
                      let token=jwt.sign({payload:uid},JWT_KEY);
                      req.cookie('login',token,{httpOnly:true});
                      return res.json({
                         message:'user logged In',
                         userDetails:data
                        })
                   }
                    else{
         
                        return res.json({
                             message:'wrong credentials'
                            })
                   }
            }
            else{
                 return res.json({
               message:'user not found'
              })
            }
        }
        else{
            return res.json({
                message:'Empty field  found'
            })
            
        }
    } 
    
    catch(err){
        return res.status(500).json ({
            message:err.message
        })
        
    }
}
module.exports=authRouter