import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentComponent from "../Payment/PaymentComponent";
import CountServices from "../../Services/CountServices";
import CustomPizzaServices from "../../Services/CustomPizzaServices";

const CustomPizza = () => {
  const [base, setBase] = useState("");
  const [sauce, setSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [Veggies, setVeggies] = useState("");
  let [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [pizzaName, setPizzaName] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getCount();
  },[]);

  const pizzaBases = [
    { name: "Base 1", price: 8.99 },
    { name: "Base 2", price: 9.99 },
    { name: "Base 3", price: 10.99 },
    { name: "Base 4", price: 11.99 },
    { name: "Base 5", price: 12.99 },
  ];
  const sauces = [
    { name: "Sauce 1", price: 0.99 },
    { name: "Sauce 2", price: 1.99 },
    { name: "Sauce 3", price: 2.99 },
    { name: "Sauce 4", price: 3.99 },
    { name: "Sauce 5", price: 4.99 },
  ];
  const cheeseTypes = [
    { name: "Cheese 1", price: 1.99 },
    { name: "Cheese 2", price: 2.99 },
    { name: "Cheese 3", price: 3.99 },
    { name: "Cheese 4", price: 4.99 },
    { name: "Cheese 5", price: 5.99 },
  ];
  const veggieOptions = [
    { name: "Veggie 1", price: 0.5 },
    { name: "Veggie 2", price: 0.75 },
    { name: "Veggie 3", price: 0.9 },
    { name: "Veggie 4", price: 1.25 },
    { name: "Veggie 5", price: 1.5 },
  ];

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    // Add base price
    const selectedBase = pizzaBases.find((item) => item.name === base);
    if (selectedBase) {
      totalPrice += selectedBase.price;
    }

    // Add sauce price
    const selectedSauce = sauces.find((item) => item.name === sauce);
    if (selectedSauce) {
      totalPrice += selectedSauce.price;
    }

    // Add cheese price
    const selectedCheese = cheeseTypes.find((item) => item.name === cheese);
    if (selectedCheese) {
      totalPrice += selectedCheese.price;
    }

    // Add veggie prices
    const selectedVeggie = veggieOptions.find((item) => item.name === Veggies);
    if (selectedVeggie) {
      totalPrice += selectedVeggie.price;
    }

    return totalPrice;
  };

  const getCount = async () => {
    let result = await CountServices.getCount();
    if (result >= 10) {
      setCount(1); // Set count to 1 if it's 10 or greater
      // Make a POST request to update count in the database
       CountServices.updateCount();
    } else {
      setCount(result);
    }
    console.log(count);
  };

  const addCount = async () => {
    try {
      let result = await CountServices.addCount(count);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const addCustomPizza = async () => {
    const price = calculateTotalPrice().toFixed(2);

    addCount();
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    if (!base || !sauce || !cheese || !Veggies) {
      setError(true);
      return false;
    }

    console.log(base, sauce, cheese, Veggies, price, userId);

    try {
      let result = await CustomPizzaServices.addCustomPizza(base,sauce,cheese,Veggies,price,userId);
      console.log(result);
      if (result) {
        setPizzaName(`${base} Pizza`);
        setTotalPrice(price);
        setShowPayment(true);
      }
      const pizzaItems =[{
        name: "Pizza",
        category: "Mixed",
        price: price,
        orderStatus:false
      }]
      const paymentData = {
        total: price,
        pizzaItems: pizzaItems,
        custome:true

        // Add other relevant data as needed
      };
      navigate("/payment", { state: paymentData });
    } catch (error) {
      console.error(error);
    }
  };

  if (showPayment) {
    return (
      <PaymentComponent total={totalPrice} pizzaItems={[{ name: pizzaName, category: "", price: totalPrice }]} />
    );
  }

  return (
    <div className="custom-pizza-container mb-5" >
      
      <div className="custom-pizza-form" style={{backgroundColor:'white'}}>
      <h3 className="font-weight-bold text text-left h-5">Custom Pizza</h3>
        <div>
        <select
          className="form-control"
          style={custome_pizza}
          value={base}
          onChange={(e) => setBase(e.target.value)}
        >
          <option value="">Select Pizza Base</option>
          {pizzaBases.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        {error && !base && (
          <span className="invalid-input">Enter Valid Base</span>
        )}

        <select
          className="form-control"
          style={custome_pizza}
          value={sauce}
          onChange={(e) => setSauce(e.target.value)}
        >
          <option value="">Select Pizza Sauce</option>
          {sauces.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        {error && !sauce && <span className="invalid-input">Enter Sauce</span>}

        <select
          className="form-control"
          style={custome_pizza}
          value={cheese}
          onChange={(e) => setCheese(e.target.value)}
        >
          <option value="">Select Pizza Cheese</option>
          {cheeseTypes.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        {error && !cheese && (
          <span className="invalid-input">Enter Cheese</span>
        )}

        <select
          className="form-control"
          style={custome_pizza}
          value={Veggies}
          onChange={(e) => setVeggies(e.target.value)}
        >
          <option value="">Select Pizza Veggies</option>
          {veggieOptions.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        {error && !Veggies && (
          <span className="invalid-input">Enter Veggies</span>
        )}

        </div>

        <button
          type="button"
          onClick={addCustomPizza}
          className="btn btn-primary " style={{marginLeft:'40%',padding:'10px',marginTop:'5px',marginBottom:'10px'}}
        >
          Order Pizza
        </button>
      </div>

      <div
        className="summary-section text text-center h-60"
        style={{ backgroundColor: "white" }}
      >
        <h3 className="text text-left font-weight-bold" >Summary:</h3>
        <p>Pizza Base: {base}</p>
        <p>Sauce: {sauce}</p>
        <p>Cheese: {cheese}</p>
        <p>Selected Veggies: {Veggies}</p>
        <h4>Total Price: ${calculateTotalPrice().toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default CustomPizza;

let custome_pizza={
  width: "70%",
  marginLeft:'80px',
  marginBottom:'5px'
}