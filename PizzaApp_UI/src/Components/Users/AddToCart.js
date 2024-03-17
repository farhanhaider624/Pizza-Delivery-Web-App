
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddToCartServices from "../../Services/AddToCartServices";
import PayManyPizzaServices from "../../Services/PayManyPizzaServices";

const AddToCart=()=>{
    const[addToCartPizza,setAddToCartPizzaList]=useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate =useNavigate();
 
    // const[name,setName]=useState("");
    // const[price,setPrice]=useState("");
    // const[category,setCategory]=useState("");
    // const[ingredients,setIngredients]=useState("");
    // const[pizaImage,setPizaImage]=useState("");

    useEffect(()=>{
               getAddToCartPizza();
    },[])
    
    const getAddToCartPizza = async () => {
        const user = localStorage.getItem('user');
        const { _id } = JSON.parse(user);
        try {
          let result = await AddToCartServices.getAddToCartPizza(_id);
          setAddToCartPizzaList(result);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const deleteAddToCartPizza = async (id) => {
        console.log(id);
        try {
          let result = await AddToCartServices.deleteAddToCartPizza(id);
          if (result) {
            setSuccessMessage("Pizza removed from cart successfully!");
            getAddToCartPizza();
            setTimeout(() => {
                setSuccessMessage("");
              }, 2000); // Hide the success message after 2 seconds
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
     
      const handlePayNow = async () => {
        // Calculate the total price and prepare the pizza items
        const totalPrice = addToCartPizza.reduce((total, item) => total + item.price, 0);
        const ok=true;
        const pizzaItems = addToCartPizza.map((item) => ({
          name: item.name,
          category: item.category,
          price: item.price,
          orderStatus:false
        }));
        const user = localStorage.getItem('user');
        const { _id } = JSON.parse(user);
        // const orderId = Date.now().toString(); // Generate a unique order ID (you can change this logic as per your requirement)
        // Prepare the data to be sent to the API
        const paymentData = {
          total: totalPrice,
          pizzaItems: pizzaItems,
          userId:_id,
          ok:ok,
         
        };
        // orderAcceptedStatus(orderId,_id);
        try {
          let result = await PayManyPizzaServices.handlePayNow(paymentData);
          if (result) {
            // Data successfully stored in the database
            // Perform any necessary actions
            console.log("Data stored in PayPizza collection:", result);
            // Clear the cart or perform other operations as needed
             // Navigate to the next component and pass the data
            navigate("/payment", { state: paymentData});
          }

          
        } catch (error) {
          console.error("Error:", error);
        }
      };
      
    return (
      <div className="container">
        {/* <h3 className="text text-center">Card Pizza List</h3> */}
        <div className="text-center d-flex justify-content-center m-3">
          <button className="btn btn-success" onClick={() => handlePayNow()}>
            Pay Now
          </button>
        </div>
        {successMessage && (
                      <div className="alert alert-success text text-dark bg-success">
                        {successMessage}
                      </div>
                    )}
        <div className="row" style={{ margin: "10px" }}>
       
          {addToCartPizza.length > 0 ? (
            addToCartPizza.map((item, index) => (
              <div className="col-md-4" key={item._id}>
                <div className="card mb-3">
                  <img
                    src={item.pizaImage}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Category: {item.category}</p>
                    <p className="card-text">Ingredients: {item.ingredients}</p>
                    <p className="card-text">
                      Time and Date: {new Date(item.time).toLocaleString()}
                    </p>
                    <p className="card-text">Total Price: ${item.price}</p>
                    <button
                      onClick={() => deleteAddToCartPizza(item._id)}
                      className="btn btn-warning"
                    >
                      Remove From Cart
                    </button>
                   
                  </div>
                </div>
                
              </div>
              
            ))
            
          ) : (
            <div className="col">
              <p className="text-primary">No Results Found</p>
            </div>
          )}
        </div>
      </div>
    );
}

export default AddToCart;