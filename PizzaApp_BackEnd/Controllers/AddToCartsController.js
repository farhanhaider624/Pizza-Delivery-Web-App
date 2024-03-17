const AddToCart = require("../Models/Pizza/AddToCart");


module.exports.addToCart=async(req,res)=>{
    {
        try{
          let result=new AddToCart(req.body);
          result=await result.save();
          res.send(result);
        }catch(error){
          console.log(error);
          res.status(500).json({error:'An Error Occurred'});
        }
      }
}

module.exports.getCartPizzaId=async(req,res)=>{
    {
        const userId = req.params.id;
      
        try {
          const AddToCartPizzas = await AddToCart.find({ userId }); // Fetch custom pizzas that match the provided user ID
          if (AddToCartPizzas.length > 0) {
            res.send(AddToCartPizzas);
          } else {
            res.send({ result: "No Pizza Found" });
          }
        } catch (error) {
          console.error("Error:", error);
          res.status(500).send({ error: "Internal Server Error" });
        }
      }
}

module.exports.deleteCartPizzaId=async(req,res)=>{
    {
        const result=await AddToCart.deleteOne({_id:req.params.id})
        res.send(result);
      }
}