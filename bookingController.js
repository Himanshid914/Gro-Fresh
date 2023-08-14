// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
let SK="sk_test_tR3PYbcVNZZ796tH88S4VQ2u";
const stripe = require('stripe')(SK);
const planModel = require("../models/planModel");
const userModel=require("../models/userModel")
const app = express();
module.exports.createSession=async function createSession(req,res){
    try{
        let userId=req.id;
        let planid=req.params.id;

        const user=await userModel.findById(userId);
        const plan =await planModel.findById(planid);
     
      const session = await stripe.checkout.sessions.create({
    
            payment_method_types:['card'],
            customer_email:user.email,
            client_refrence_id:plan.id,
            line_items:[
                {
                name:plan.name,
                description:plan.description,
                //deploy website
                amount:plan.price*100,
                currency:"inr",
                quantity:1,
                }
            ],
    
    
            success_url: `${req.protocol}://${req.get("host")}/profile`,
            cancel_url: `${req.protocol}://${req.get("host")}/profile`, 
      })

        res.status(200).json({
            status:"success",
            session
        });
    }
    catch(err){
          res.status(500).json({
              err:err.message
          });
    }
}


app.listen(4242, () => console.log('Running on port 4242'));