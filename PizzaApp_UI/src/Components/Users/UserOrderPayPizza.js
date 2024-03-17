import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PayPizzaService from "../../Services/PayPizzaService";
import io  from 'socket.io-client';

const UserPayPizzaList=()=>{
    const[orderList,setOrderList]=useState([]);

    const[message,setMessage]=useState("");
   
    const message1 = useRef();
    const message2=useRef();

    const location=useLocation();
    const navigate=useNavigate();
  
    const { status } = location.state || { status: false };
    console.log(status);
   
    const socket =io.connect("http://localhost:8000");

    useEffect(()=>{
        getPayPizzaOrder();
    },[]);

    const prevCount = JSON.parse(localStorage.getItem('message1'));
    useEffect(() => {
      const user = localStorage.getItem('user');
      const { _id } = JSON.parse(user);
      
      socket.emit("join_room", _id);
    
      socket.on("receive", (data) => {
        console.log("data.data:-"+data.data);
       
        localStorage.setItem('message',JSON.stringify(data.data));
        setMessage(JSON.parse(localStorage.getItem('message')));
        message1.current = message;
        localStorage.setItem('message1', JSON.stringify(message1.current));
        message2.current = prevCount;
        localStorage.setItem('message2', JSON.stringify(message2.current));

      });
    }, [socket,message,prevCount]);

  
    const preCount1 = JSON.parse(localStorage.getItem('message2'));
    const preCount2=JSON.parse(localStorage.getItem('message'));


    const getPayPizzaOrder = async () => {
        try {
          const user=localStorage.getItem('user')
          const { _id } = JSON.parse(user);
          let result = await PayPizzaService.getPayPizzaOrder(_id);
          setOrderList(result);
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
      const deletePayPizzaOrder = async (id) => {
        localStorage.removeItem('message');
        localStorage.removeItem('message1');
        localStorage.removeItem('message2');
        console.log(id);
        try {
          let result = await PayPizzaService.deletePayPizaaOrder(id);
          if (result) {
               getPayPizzaOrder();
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };  

      const handlePayNow = (total, pizzaItems, ok, custome) => {
        navigate("/payment", { state: { total, pizzaItems, ok, custome } });
      };

    return(
        <>
        <div>
          <h4 style={{fontWeight:'bold'}}>Order Pay Pizza List</h4>
          <table className="table order-list" style={{backgroundColor:"white"}}>
            <thead>
              <tr>
                <th>Order.No</th>
                <th>Pizza Name</th>
                <th>category</th>
                <th>ingredients</th>
                <th>Date</th>
                <th>Time</th>
                <th>Total Price</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {orderList.length > 0 ? (
                orderList.map((item, index) => (
                  <tr key={item._id}>
                    <td className="text-success order-id">{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.ingredients}</td>
                    <td>{new Date(item.time).toLocaleDateString()}</td>
                    <td>{new Date(item.time).toLocaleTimeString()}</td>
                    <td>${item.price}</td>
                    <td>
                      {
                      
                      status ? (
                        <samp>Payment Done</samp>
                      ) : (
                        <button className="btn btn-warning mr-3"  onClick={() => handlePayNow(item.price, [item], false, false)}>
                        
                            Pay Now
                        </button>
                      )}
                      <button onClick={() => deletePayPizzaOrder(item._id)} className="btn btn-warning">
                        Order Cancel
                      </button>
                    </td>
                    <td>1.{preCount1}-------- 2.{prevCount} --------- 3.{preCount2}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-primary">
                    No Results Found
                  </td>
                </tr>
              )}
            </tbody>
           
          </table>
          
        </div>
       
        </>
    )
}

export default UserPayPizzaList;