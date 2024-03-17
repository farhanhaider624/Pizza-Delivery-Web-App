const PayManyPizza = require("../Models/PayPizza/PayManyPizza");


module.exports.addManyPayPizza=async(req,res)=>{
    {
        try {
          const payPizzaData = req.body; // Array of pay pizza objects
      
          // Insert the array of pay pizza objects into the PayPizza collection
          const result = await PayManyPizza.insertMany(payPizzaData);
      
          res.status(200).json(result);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'An error occurred' });
        }
      }
}


module.exports.deleteManyPayPizzaItemTotal=async(req,res)=>{
    {
        try {
          const { total } = req.params;
          let result = await PayManyPizza.deleteOne({ total: total });
          res.send(result);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'An Error Occurred' });
        }
      
      }
}

module.exports.getAllManyPayPizza=async(req,res)=>{
    {
        let payPizza=await PayManyPizza.find();
        if(payPizza){
            res.send(payPizza);
        }else{
            res.send({result:"No Ingredients  Pizza Found"});
        }
        
      }
}

module.exports.getManyPayPizzaId=async(req,res)=>{
    {
        const userId = req.params.id;
        try {
          const payManyPizza = await PayManyPizza.find({ userId }); // Fetch custom pizzas that match the provided user ID
          if (payManyPizza.length > 0) {
            res.send(payManyPizza);
          } else {
            res.send({ result: "No Pizza Found" });
          }
        } catch (error) {
          console.error("Error:", error);
          res.status(500).send({ error: "Internal Server Error" });
        }
      }
}

module.exports.deleteManyPayPizzaId=async(req,res)=>{
    {
        try {
          
          let result = await PayManyPizza.deleteOne({ _id: req.params.id });
          res.send(result);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'An Error Occurred' });
        }
      
      }
}