const mongoose =require( 'mongoose');// moongoose 
const emailValidator=require('email-validator');
const bcrypt=requore('bcrypt');
const crypto=require('crypto');
const { TokenExpiredError } = require('jsonwebtoken');
//_------------------MONGO DB------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const db_link="mongodb+srv://himanshi200214:8K9Rou1lFYOUQPaF@cluster0.bpxwmnq.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
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
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8

    },
    confirmpassword:{
        type:String,
        required:true,
        minlength:8,
        validate:function(){
            return this.confirmpassword==this.password;
        }
    },

role:{
    type: String,
    enum:['admin','user','restaurantowner','deliveryboy'],
    default:'user'
},
profileImage:{
    type:String,
    default:'img/users/default.jpeg'
},
resetToken:String
});


//-------mongoose hooks---pre,post
userSchema.pre('save',function(){
    this.confirmpassword=undefined;
});
userSchema.method.createResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.resetToken=resetToken;
    return resetToken;
}
userSchema.method.resetPasswordHandler=function (password,confirmPassword) {
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken= undefined ;
}
/*userSchema.pre('save',async function(){
    let salt =bcrypt.gensalt();
    let hashedString=await bcrypt.hash(this.password,salt);
    this.password=hashedString; 
});*/
userSchema.method.createResetToken=function(){
    //creating unique token using npm i crypto
    const resetToken=crypto.randomBytes(32).toString("hex");
    this.resetToken;
    this.resetToken=resetToken;
    return resetToken;
}
userSchema.method.resetPasswordHandler=function(password
    ,confirmPassword){
        this.password=password;
        this.confirmPassword=confirmPassword;
        this.resetToken=undefined;

}
//---------creating models-------
const userModel=mongoose.model('userModel',userSchema);
 module.exports=userModel;