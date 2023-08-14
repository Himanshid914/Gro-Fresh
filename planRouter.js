const express=require('express');

const planRouter=express.Router();
const {protectRoute, isAuthorised}=require('../controller/authController');
const {getAllPlans,getPlan,createPlan,deletePlan,updatePlan,top3plans}=require('../controller/planController')

// all plans lekar aayega
planRouter
.route('/Allplans/:id')
.get(getAllPlans)

//own plan --> logged in hona necesary h
planRouter.use(protectRoute)
planRouter.route('/plan/:id')
.get(getPlan)

//only admin ,restaurantowner can create ,update, or delete plans
planRouter.use(isAuthorised['admin','rastaurantowner']);
//curds
planRouter
.route('/crudPlan')
.post(createPlan)
.patch(updatePlan)
.delete(deletePlan)

//top3plan
planRouter.route('/top3plans./top3') //////can have error
module.exports=planRouter