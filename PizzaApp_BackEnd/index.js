const express = require('express');
const app = express();
const cors = require('cors');
const http=require('http');
const {Server} =require('socket.io');
require('./db/config');

const userController=require('./Controllers/UserController');
const paymentController=require('./Controllers/paymentController');
const pizzaController=require('./Controllers/PizzaController');
const customPizzaController=require('./Controllers/CustomPizzaController');
const ingredientsCustomPizzaController=require('./Controllers/IngredientCustomePizzaController');
const countController=require('./Controllers/CountController');
const addToCartController=require('./Controllers/AddToCartsController');
const payPizzaController=require('./Controllers/PayPizzaController');
const payManyPizzaController=require('./Controllers/PayManyPizzaController');
const pizzaStatusController=require('./Controllers/PizzaStatusController');
const User = require('./Models/Users/User');
const IngrediendenEmail=require('./Email/IngrediendenEmail');

app.use(express.json());
app.use(cors());

//socket.io code here:-

const server =http.createServer(app);
const io=new Server(server,{
  cors:{
    origin:'http://localhost:3000',
    methods: ['GET','POST'],
  }
})

io.on('connection',(socket)=>{
    //  console.log(`user connected  ${socket.id}`);
     
     socket.on("join_room", (data) => {
      console.log("user_Id : ="+data);
      socket.join(data);
    });
  

     socket.on("accepted_Order",(data)=>{
      console.log(data);
      // socket.broadcast.emit("receive",data);
    //  io.to(data.room).emit("receive", data.data);
    io.to(data.room).emit("receive", data);
    
     })

     socket.on("in_kitchen_Order",(data)=>{
      console.log(data);
      // socket.broadcast.emit("receive",data);
      // io.to(data.room).emit("receive", data);
      io.to(data.room).emit("receive", data);
    
     })

     socket.on("order_Send",(data)=>{
      console.log(data);
      // socket.broadcast.emit("receive",data);
      //io.to(data.room).emit("receive", data);
      io.to(data.room).emit("receive", data);
    
     })
     
     socket.on("success",(data)=>{
      console.log(data.data);
      io.emit("success", data);
     })
     let isEmailSent = false;
     socket.on("limit", (item) => {
      console.log("Item Remaining: " + item.data);
      
      if (!isEmailSent) { // Check if the email has already been sent
        IngrediendenEmail.sendEmailIngredient(item.data, item.userEmail);
        isEmailSent = true; // Set the flag to indicate that the email has been sent
      }
    });

   socket.on('disconnect',()=>{
    console.log("disconnected user");
   })

})


//Users Route:-
app.post("/register", userController.register);

app.get("/get-user/:id",userController.getUserId );

app.post("/login", userController.login);

app.put('/forgot', userController.forgot );

app.get('/verify-email', async (req, res) => {
  try {
    

    const user = await User.updateOne(
      { _id: req.query.token },
      { $set: { is_varified: 1 } }
    );
    
    console.log(user);

    if (user.modifiedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Email verified successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




//Pizza Route:-
app.post("/add-pizza", pizzaController.addPizza);

app.get("/all-pizza",pizzaController.allPizza);

app.delete("/delete-pizza/:id",pizzaController.deletePizzaId);

app.put("/update-pizza/:id",pizzaController.updatePizzaId);

app.get("/get-single-pizza/:id",pizzaController.getSinglePizzaId);

app.get("/search/:key",pizzaController.searchKey);



//Custome-Pizza-Route:-
app.post("/add-custom-pizza",customPizzaController.addCustomPizza );

app.get("/get-custom-pizza",customPizzaController.getCustomPizza);

app.get("/get-custom-pizza/:id",customPizzaController.getCustomPizzaId);


app.delete("/delete-custom-pizza/:id",customPizzaController.deleteCustomPizzaId);  

app.delete("/delete-custom-pizza-price/:price",customPizzaController.deleteCustomPizzaPricePrice);


//Ingredients custome pizza Route:-
app.post("/add-ingredients-custom-pizza", ingredientsCustomPizzaController.addIngredientsCustomPizza );

app.delete("/delete-ingredients-custom-pizza/:id",ingredientsCustomPizzaController.deleteIngredientsCustomPizzaId);  

app.put("/update-ingredients-custom-pizza/:id",ingredientsCustomPizzaController.updateIngredientsCustomPizzaId);

app.get("/get-ingredients-custom-pizza/:id",ingredientsCustomPizzaController.getIngredientsCustomPizzaId);

app.get("/all-pizza-ingredients",ingredientsCustomPizzaController.allPizzaIngredients);


//Count Route:-
app.post('/add-count', countController.addCount );

app.post("/update-count", countController.updateCount );

app.get('/get-count', countController.getCount);


//Add To Cart  Route:-
app.post('/add-to-cart',addToCartController.addToCart)

app.get("/get-cart-pizza/:id",addToCartController.getCartPizzaId  );

app.delete("/delete-cart-pizza/:id",addToCartController.deleteCartPizzaId);  


//Pay-Pizza Route:-
app.post('/add-pay-pizza',payPizzaController.addPayPizza)

app.delete('/delete-pay-pizza/:total', payPizzaController.deletePayPizzaTotal);

app.get("/get-all-pay-pizza",payPizzaController.getAllPayPizza);

app.get("/get-pay-pizza/:id", payPizzaController.getPayPizzaId );

app.delete('/delete-pay-pizza-order/:id',payPizzaController.deletepayPizzaOrderId);



//Pay-Many-Pizza-Route:-
app.post('/add-many-pay-pizza', payManyPizzaController.addManyPayPizza );

app.delete('/delete-many-pay-pizza-item/:total',payManyPizzaController.deleteManyPayPizzaItemTotal)

app.get("/get-all-many-pay-pizza",payManyPizzaController.getAllManyPayPizza);

app.get("/get-many-pay-pizza/:id",payManyPizzaController.getManyPayPizzaId );

app.delete('/delete-many-pay-pizza/:id',payManyPizzaController.deleteManyPayPizzaId)


//Accepted-pizza-Route:-
app.post('/accepted-pizza',pizzaStatusController.acceptedPizza);

//Payment-pizza-Route:-
app.post('/orders',paymentController.orders);
app.post('/verify',paymentController.verify);

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
