
const express=require('express');

const userRouter=express.Router();
//const protectRoute=require('./authHelper');
const {getUsers,getAllUser,postUser,updateUser,deleteUser}=
require('../controller/userController');
//const { append } = require('express/lib/response');
const {login,signup,isAuthorised,protectRoute,logout}=require('../controller/authController'); 
//user ke options 
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)

userRouter
.route('/forgetpassword')
.post(forgetpassword)

userRouter
.route('/resetpassword/:token')
.post(resetpassword)

userRouter
.route('/logout')
.get(logout)
//profile page
userRouter.use(protectRoute);
userRouter
.route('userProfile')
.get(getUser)




//admin specific function
app.use(isAuthorised(['admin']));
userRouter
.route('')
.get(getAllUser)
/*
app.use('/user',userRouter); 
userRouter
.route('/')
.get(getUsers)     // these are path specific middleware 
.post(postUser)
.patch(updateUser)
.delete(deleteUser);

//userRouter.route('/:id').get(getUserById);
userRouter
.route("/getCookies")
.get(setCookies);

userRouter
.route("/setCookies")
.set(setCookies);


userRouter.route('/:id').get(getUserById);

//create signup html page 

async function getUsers(req,res){
    let users= await userModel.find();
    if(users){
        return res.json(users);

    }
    else{
        res.json({
            message:'user not found '
        });
    }
    res.json({message:'list of all users',data:allUsers
});
};
function postUser(req,res){ 
    console.log(req.body);   // frontend se data request k through req ke body m store hota h
    users=req.body;
    res.json({
        message:'data recived successfully',
        user:req.body
    });
};
async function updateUser(req,res){
    console.log('req.body->',req.body);
    //---Update data in user obj.---
    //using for in loop--
    let dataToBeUpdated=req.body;
    let users=await userModel.dataToBeUpdated(
        {email:'abc@gmail.com'},dataToBeUpdated);    
    res.json({
        message:'data is updated successfully',
        data:user 
    });

};
 async function deleteUser(req,res){ 
    //users={};
    let dataToBeDeleted=req.body;
    let user=await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message:"data has been deleted",
        data:user
    });
};
function getUserById(req,res){
    console.log(req.params.username);
    console.log(req.params);
    res.send("user id recieved")
    }
    

function setCookies(req,res){
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
//let flag=true ///denote user looged in or not 
function protectRoute(req,res,next){
    if(req.cookies.isLoggedIn){
        next();
    }
    else{
        res.json({
            message:'Please login //Operation not allowed '
        })
    }
}

*/
module.exports=userRouter