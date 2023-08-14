const userModel = require('../models/userModel');
module.exports.getUser=async function getUsers(req,res){
    
    let id=req.params.id;
    let user= await userModel.find();
    if(user){
        return res.json(user);

    }
    else{
        res.json({
            message:'user not found '
        });
    }
    res.json({message:'list of all users',
    data:allUsers
});
};
module.exports.postUser=function postUser(req,res){ 
    console.log(req.body);   // frontend se data request k through req ke body m store hota h
    users=req.body;
    res.json({
        message:'data recived successfully',
        user:req.body
    });
};
module.exports.updateUser=async function updateUser(req,res){
    try{
        let id=req.params.id;
        let user=await userModel.findById(id);
     //console.log('req.body->',req.body);
      //---Update data in user obj.---
     //using for in loop--
        let dataToBeUpdated=req.body;
        if(user){
          const keys=[];
           for(let key in dataToBeUpdated){
            keys.push(key);
           }
          for(let i=0 ;i<keys.length;i++){
            user[keys[i]]=dataToBeUpdated(keys[i]);
          }
          const updateUser=await user.save();
    
         //let users=await userModel.dataToBeUpdated(
          //  ,dataToBeUpdated);    
            res.json({
            message:'data is updated successfully',
            data:user 
        });
        } 
        else{
           res.json({
            message:'user not found',});
        } 
    }
    catch(err){
        res.json({
            message:err.message
        });

    }
};
module.exports.deleteUser= async function deleteUser(req,res){ 
    //users={};
    try{
    let id=req.params.id;
    let user=await userModel.findByIdAndDelete(id);
    if(!user){
        res.json({
            message: 'user not found'
        })
    }
    res.json({
        message:"data has been deleted",
        data:user
    })
    }
    catch(err){
    res.json({
    message:err.message
    })
    }
};
module.exports.getAllUser=function getAllUser(req,res){
    //console.log(req.params.username);
    //console.log(req.params);
    let users =await userModel.find();
    if(users){
        res.json({
            message:'user retrived',
            data:users
        })
    }
    res.send("user id recieved")
    }
    

/*function setCookies(req,res){
        //res.setHeader('Set-Cookies','isLoggedIn=true');
        res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
        res.cookie('isPrimeMember ',true);
        res.send('cookies has been set');
    }
function getCookies(req,res){
        let cookies=req.cookies.isLoggedIn;
        console.log(cookies);
        res.send('cookies recived');
    }
 */   