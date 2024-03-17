const mongoose=require('mongoose');

const ingredientsPizzaSchema=new mongoose.Schema({
    base:Number,
    sauce:Number,
    cheese:Number,
    Veggies:Number,
   
    
});

module.exports=mongoose.model("ingredients-custom-pizzas",ingredientsPizzaSchema)