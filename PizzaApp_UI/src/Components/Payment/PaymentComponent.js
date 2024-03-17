import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PayManyPizzaServices from "../../Services/PayManyPizzaServices";
import PayPizzaService from "../../Services/PayPizzaService";
import CustomPizzaServices from "../../Services/CustomPizzaServices";
import io from "socket.io-client";

const PaymentComponent = () => {
  const location = useLocation();
  const navigate =useNavigate();

  const socket =io.connect("http://localhost:8000");

  const { total, pizzaItems, ok, custome } = location.state;
  
  const deleteCustomPizza = async (total) => {
    console.log("total :- " + total);
    try {
      let result = await CustomPizzaServices.deleteCustomPizza(total);
      if (result) {
        console.log(result);
        navigate('/user-pizza-list');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
   
  const deletePizza = async (total) => {
    console.log("total :- "+ total);
    try {
      let result = await PayPizzaService.deletePizza(total);
      if (result) {
         console.log(result);
         navigate('/user-pizza-list')
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const deleteManyPayPizza = async (total) => {
    try {
      let result = await PayManyPizzaServices.deleteManyPayPizza(total);
      if (result) {
        console.log("PayPizza documents deleted:", result);
        navigate("/user-pizza-list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoBack = () => {
    // Call the deletePayPizza function with the total value
    console.log("OrdrerSatatus:-"+pizzaItems[0].orderStatus);
    deleteManyPayPizza(total);
  };
  const handleGoCancle = () => {
    // Call the deletePayPizza function with the total value
    console.log("OrdrerSatatus:-"+pizzaItems[0].orderStatus);
    deletePizza(total);
  };
  const handleGoCancleCustomeOrder = () => {
    // Call the deletePayPizza function with the total value
    console.log("OrdrerSatatus:-"+pizzaItems[0].orderStatus);
    deleteCustomPizza(total);
  };

 //Payment Concept:- 
   const handleOpenRazorpay=(data)=>{
               const options={
                key:'razorPay-key',
                amount:data.amount,
                currency:data.currency,
                name:'Pizza App',
                description:'XYZ',
                order_id:data.id,
                handler:function (response){
                 console.log(response,"85");
                 axios.post('http://localhost:8000/verify',{response:response})
                 .then(res=>{
                  console.log(res,"37")
                  let status=true;
                  socket.emit('success',{data:'Succes',room:data.id});
                  navigate("/user-pizza-list", { state: { status:true } });
                 })
                 .catch(err => {
                  console.log(err);
                })
              },
             
               };
               const rzp=new window.Razorpay(options);
               rzp.open();
   }

   const handlePayment =(amount) => {
    const _data={amount:amount}
    axios.post('http://localhost:8000/orders',_data)
    .then(res=>{
      console.log(res.data,"99");
      handleOpenRazorpay(res.data.data);

    })
    .catch(err => {
      console.log(err);
    })
   }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h3 className="card-header text text-center text-success">
              Payment
            </h3>
            <div className="card-body">
              <h3 className="text text-center text-danger">
                Total Amomunt Pay :- {total}
              </h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {pizzaItems.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>
                        {" "}
                        <tr></tr>
                      </td>
                    </tr>
                  ))}
                  <tr className="text text-danger">
                    <td></td>
                    <td></td>
                    <td>
                      <b>Total Price</b>
                    </td>
                    <td>
                      <b>{total}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                {custome ? (
                  <button
                    className="btn btn-warning ml-3"
                    onClick={handleGoCancleCustomeOrder}
                  >
                    Custom
                  </button>
                ) : ok ? (
                  <button
                    className="btn btn-warning ml-3"
                    onClick={handleGoBack}
                  >
                    Back
                  </button>
                ) : (
                  <button
                    className="btn btn-primary ml-3"
                    onClick={handleGoCancle}
                  >
                    Cancle
                  </button>
                )}
                <button
                  className="btn btn-success ml-3"
                  onClick={()=>handlePayment(total)}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
