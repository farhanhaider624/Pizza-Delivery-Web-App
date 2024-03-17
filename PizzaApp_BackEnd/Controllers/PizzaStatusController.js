const PizzaStatus = require("../Models/PizzaStatus/PizzaStatus");

module.exports.acceptedPizza=async(req,res)=>{
    {
        let result=new PizzaStatus(req.body);
        result= await result.save();
        res.send(result);
      
      }
}