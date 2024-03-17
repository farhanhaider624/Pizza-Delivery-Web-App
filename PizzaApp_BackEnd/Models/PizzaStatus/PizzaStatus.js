const mongoose=require('mongoose');

const pizzaStatusSchema=new mongoose.Schema({
    
         orderAccepted:Boolean,
         userId:String,
         orderId:String
          
});

module.exports=mongoose.model("pizzas-statu",pizzaStatusSchema)