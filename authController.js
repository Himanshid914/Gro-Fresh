const express=require('express');
 
const userModel=require('../models/userModel'); 
const jwt=require('jsonwebtoken');
const JWT_KEY=require('secrets.js');
const { model } = require('mongoose');

//signup user
module.exports.signup=async function signup(req,res){
    try{
        let dataObj=eq.body;
        let user=await userModel.create(dataObj);
        if(user){
            return res.json({
                message:'user signedup',
                data:user
            });
        }  
        else{
            return res.json({
                message:'error while  signeingup',
                data:user
            });
        }  
    }
    catch(err){
        //res.status(500);
        res.json({
            message:err(message)
        });
    }
} 
//login user
module.exports.login=async function loginUser(req,res){
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
//isauthorised -->to check wheather user  is[admin,user,deliveryBoy,restaurantOwner]
module.exports.isAuthorised =function isAuthorised(roles){
    return function(req,res){
        if(roles.includes(req.role)==true){
            next();
        }
        else{
            res.status(401).json({
                message:' opperation not allowed   '
            })
        }
    }
}
//protect route
module.exports.protectRoute =async  function protectRoute(req,res,next){
    try{
        let token;
        if(req.cookies.isLoggedIn){
            console.log(req.cookies);
            token=req.cookies.login;
            let payload=jwt.verify(token  ,JWT_KEY);
            if(payload){
                console.log('payload token',payload);
                const user =await userModel.findById(payload);
                req.role=user.role;
                req.id=user.id;
                console.log(req.role,req.id )
                next();
            }
            else{
                //browser
                const client=res.get('User-Agent');
                if(client.includes('Mozilla')){
                    return res.redirect('/login')
                }
                else{ 
                   res.json({
                    message:'please login again'
                   }); 
                } 
            }
        }
        else{
            res.json({
                 message:'please login' 
            })
        }
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
}
//forgetPassword
module.exports.forgetpassword=async function forgetpassword(req,res){
   let{email}=req.body;
   try{
       const user=await userModel.findOne({email:email})
       if(user){
           //createRestToken is used to creste new token 
           const resetToken=user.createResetToken()
            http://abc.com/resetpassword/resetToken
            let resetPasswordLink=`${req.protocol}://${req.get('host')}/resetpassword/${resetToken} `
           //send email --->nodemailer
        }
        else{
            return res.status(500). json({
                message:'please signup'
            });
        }
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}
//resetPassword
module.exports.resetpassword=async function resetpassword(req,res){
    try{
     const token=req.params.token;
     let {password,confirmpassword}=req.body;
     const user=await userModel.findOne({resetToken});
        if(user){
         //resetpassword handller will save / update password in db
          user.resetPasswordHandler(password,confirmpassword);
            await user.save();
              res.json({
              message:"password changed successfully please login again"
            });
        }
        else{
            res.json({
                message:"user not found"
              });
        }
     
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}
module.exports.logout=function logout(req,res){
   res.cookie('login','',{maxAge:1});
   res.json({
       message:'user logged out successfully'
   })
}