const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModel");
const {updatePlan}=require('../controller/planController');
const planRouter = require("../Routers/planRouter");
module.exports.getAllReviews=async function  getAllReviews(req,res){
    try{
        const reviews=await reviewModel.find();
        if(reviews){
            return res.json({
                message:'reviews retrived',
                data:reviews
            });
        }
        else{
            return res.json({
                message:'reviews not found'
            });
        }

    }
    catch(err){
        res.json({
            message:'reviews not found'
        });
    }
}
module.exports.top3reviews=async function  top3reviews(req,res){
    try{
        const reviews=await reviewModel
        .find()
        .sort({
            rating:-1
        }).limit(3);
        if(reviews){
            return res.json({
                message:'reviews retrived',
                data:reviews
            });
        }
        else{
            return res.json({
                message:'reviews not found'
            });
        }

    }
    catch(err){
        res.json({
            message:'reviews not found'
        });
    }
}
module.exports.getPlanReviews=async function  getPlanReviews(req,res){
    try{
        let planid=req.params.id;
        let reviews=await reviewModel.findById(id);
        reviews.filter(review=>plan._id==planid)
        return res.json({
            message:'review retrived for a particular plan successful',
            data:reviews
        })
    }
    catch(err){
        res.json({
            message:'review not found'
        });
    }
}
module.exports.createReview=async function  createReview(req,res){
    try{
        let id=req.params.plan;
        let plan=await planModel.findById(id);
        
        let review=await reviewModel.create(req.body);
        plan.ratingAverage=(  plan.ratingAverage +  res.body.rating)/2;
        await plan.save();
        res.json({
                message:'reviews created',
                data:review
            });
    }
    catch(err){
        res.json({
            message:'reviews not found'
        });
    }
}
module.exports.updateReview=async function updateReview(req,res){
  let planid=req.params.id; 
  //review id from front end;
  let id=req.body.id;  
  let dataToBeUpdated=req.body;
  let keys=[];
        for(let key in dataToBeUpdated){
            if(key=='id')continue;
            keys.push(key);
        }
        let review=await reviewModel.findById(id); 
        for(let i=o;i<keys.length;i++){
            review[keys[i]]=dataToBeUpdated[keys[i]];
        }
       
        //doc
        await review.save();
       
          return res.json({
                message:'data updated successfully',
                data:review
            });
}
module.exports.deleteReview=async function  deleteReview(req,res){
    try{
        let planid=req.params.id;
        //review id from front end;
        let id=req.body.id;  
        let review=await reviewModel.findByIdAndDelete(id);
       
        res.json({
                message:'reviews deleted',
                data:review
            });
    }
    catch(err){
        res.json({
            message:'reviews not found'
        });
    }
}