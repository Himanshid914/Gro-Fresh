const planModel=require('../models/planModel');

module.exports.getAllPlans=async function getAllPlans(req,res){
    try{
        let plans= await planModel.find();
        if(plans){
           return res.json({
               message:'all palns retrived',
               data:plans
           });
        }
        else{
            return res.json({
                message:'plan not found'
            });
        }

    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
module.exports.getPlan=async function getPlan(req,res){
    try{
        let id=req.params.id;
        let plans= await planModel.findById(id );
        if(plans){
           return res.json({
               message:' plan retrived',
               data:plans
           });
        }
        else{
            return res.json({
                message:'plan not found'
            });
        }

    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
module.exports.createPlan=async function createPlan(req,res){
    try{
        let planData=req.body;
        let createdPlan=await planModel.createPlan(planData);
        if(createdPlan){
            return res.json({
                message:'plan created successfully',
                data:createdPlan
            });
        }
        else{
            return res.json({
                message:'plan not created'
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
module.exports.deletePlan=async function deletePlan(req,res){
    try{
        let id=req.params.id;
        let deletePlan=await planModel.findByIdandDelete(planData);
        if(deletePlan){
            return res.json({
                message:'plan deleted successfully',
                data:deletePlan
            });
        }
        else{
            return res.json({
                message:'plan not deleted'
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
module.exports.updatePlan=async function updatePlan(req,res){
    try{
        let id=req.params.id;
        let dataToBeUpdated=req.body;
        console.log(id);
        console.log(dataToBeUpdated);
        let keys=[];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }
        let plan =await planModel.findById(id);
        for(let i=o;i<keys.length;i++){
            plan[keys[i]]=dataToBeUpdated[keys[i]];
        }
        console.log(plan);
        //doc
        await plan.save();
       
          return res.json({
                message:'data updated successfully',
                data:plan
            });
        
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
//get top3plan
module.exports.top3plans=async function top3plan(req,res){
    try{
        const plans=await planModel.find().sort({
            ratingAverage:-1
        }).limit(3);
        return res.json({
            message:'top3plans',
            data:plans
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}