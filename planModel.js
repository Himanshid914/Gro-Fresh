const mongoose =require( 'mongoose');// moongoose 


//_------------------MONGO DB------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const db_link="mongodb+srv://himanshi200214:8K9Rou1lFYOUQPaF@cluster0.bpxwmnq.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('plan db connected');
})
.catch(function(err){
    console.log(err);
});

const planSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:[20,'plan name should not exceed more than 20 characters']
    },
    duration:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:[true,'price not entered ']
    },
    ratingAverage:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
        validate:[function(){
           return this.discount<100;
        },'discount should not exceed price']
    }
});
//model
const planModel=mongoose.model('planModel',planSchema);
(async function createPlan(){
    let planObj={
        name:'Superfood',
        duration:30,
        price:1000,
        ratingAverage:5,
        discount:20
    }
    //both are same 
    //let data=await planModel.create(planObj);
    //console.log(data)
    const doc=new planModel(planObj);
    await doc.save();
})();

module.exports=planModel;