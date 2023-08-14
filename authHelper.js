//let flag=true ///denote user looged in or not 
const jwt=require('jsonwebtoken');
const JWT_KEY=require('secrets.js');
function protectRoute(req,res,next){
    if(req.cookies.isLoggedIn){
        let isVerified=jwt.verify(req.cookies.login  ,JWT_KEY);
        if(isVerified){
         next();
        }
        else{
            res.json({
                message:'user not verified'
            }); 
        }
    }
    else{
        res.json({
            message:'Please login //Operation not allowed '
        })
    }
}
module.exports=protectRoute;