const express=require('express');
//const { sendFile } = required('express/lib/response');////check

const app=express();
const userModel=require('./models/userModel'); 

const cookieParser=require('cookie-Parser');
////------>>>> middleware  functions--->>post, -->>front se jo data aa raha h usa json m convert kar do
app.use(express.json());  //this is global middleware function 
app.listen(3000); 
app.use(cookieParser());  
//let users=[];
////################## creating mini app ###################
const userRouter=require('./Routers/userRouter');
//base route  ,router to use
//const authRouter=express.Router();
const planRouter=require('./Routers/planRouter');
const reviewRouter=require('./Routers/reviewRouter');
const bookingRouter=require('./Routers/bookingRouter');
app.use('/user',userRouter);  //for user--using express.router (exist) --app.use--ask for its base url/path --/user--use userRouter
//app.use('/auth',authRouter);
app.use('/plans',planRouter);
app.use('/reviews',reviewRouter);
app.use('/booking',bookingRouter);
//const planRouter=require('./models/planModel');

/*userRouter
.route('/')
.get(getUsers)     // these are path specific middleware 
.post(postUser)
.patch(updateUser)
.delete(deleteUser);

userRouter.route('/:id').get(getUserById);

authRouter
.get(middleware1,getSignUp,middleware2)  //here 1st middleware function run and then move to getsignup function (next());move in sequence 
.post(postSignUp);
//--------------------------------------------------- NO use after mounting-------------------


//------------##############################
//-------->>>>>  MOunting  express

 
function postUser(req,res){ 
    console.log(req.body);   // frontend se data request k through req ke body m store hota h
    users=req.body;
    res.json({
        message:'data recived successfully',
        user:req.body
    });
};
function updateUser(req,res){
    console.log('req.body->',req.body);
    //---Update data in user obj.---
    //using for in loop--
    let dataToBeUpdated=req.body;
    for(key in dataToBeUpdated){
        user[key]=dataToBeUpdated[key];
    }
    res.json({
        message:'data is updated successfully', 
    });
};
function deleteUser(req,res){ 
    users={};
    res.json({
        message:"data has been deleted",
    });
};
function getUserById(req,res){
    console.log(req.params.id);
    let paramId=req.params.id;
    let obj={};
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId){
            obj=users[i];
        }  
    }
    res.json({
        message:"req recived",
        data:obj
    });
};
//create signup html page 
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
};
function postSignUp(req,res){
    let obj=req.body;
    console.log('backend',obj);
    res.json({
    message:"user is signed up",
    data:obj
    });
};
//------->>> Cookies--------
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
//_------------------MONGO DB------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const db_link="mongodb+srv://himanshi200214:8K9Rou1lFYOUQPaF@cluster0.bpxwmnq.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_link)
.then(function(db){
    console.log(db);
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});
//-------creating schema ---
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8

    },
    confirmpassword:{
        type:String,
        required:true,
        minlength:8
    }
});
//---------creating models-------
const userModel=mongoose.model('userModel',userSchema);
 /*(async function createUser(){
    let User={   /////as an example take a user----
     name:'Hiamnshi',
     email:'himanshi@gmail.com',
     password:'hiamnshi',
     confirmpassword:'hiamnshi'
    };
    let data=await userModel.create(user);
    console.log(data);
})();*/