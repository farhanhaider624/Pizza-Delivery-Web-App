const mongoose=require('mongoose');

const pizzaSchema=new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    ingredients:String,
    pizaImage:String
});

module.exports=mongoose.model("info-pizzas",pizzaSchema)








