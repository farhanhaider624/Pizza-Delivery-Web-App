import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PayManyPizzaServices from "../../Services/PayManyPizzaServices";
import io  from 'socket.io-client';


const UserOrderPayManyPizza=()=>{
    const[orderList,setOrderList]=useState([]);
    const[message,setMessage]=useState("");
    const message1 = useRef();
    const message2=useRef();

    
    const location=useLocation();
    const navigate=useNavigate();
    
    const socket =io.connect("http://localhost:8000");

    const { status } = location.state || { status: false };
    console.log(status);

    useEffect(()=>{
      getPayManyPizzaOrderId();
    },[])

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
    


    

     const getPayManyPizzaOrderId = async () => {
        try {
          const user=localStorage.getItem('user')
          const { _id } = JSON.parse(user);
          let result = await PayManyPizzaServices.getPayManyPizzaOrderId(_id);
          setOrderList(result);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const deleteManyPayPizaaOrder = async (id) => {
        localStorage.removeItem('message');
        localStorage.removeItem('message1');
        localStorage.removeItem('message2');
        try {
          let result = await PayManyPizzaServices.deleteManyPayPizaaOrder(id);
          if (result) {
            getPayManyPizzaOrderId();
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
          <h4 style={{fontWeight:'bold'}}>Order Many Pizza List</h4>
    <div>
      <table className="table order-list" style={{backgroundColor:"white"}}>
        <thead>
          <tr>
            <th>Order No</th>
            <th>Pizza Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Date</th>
            <th>Time</th>
            <th>Total Price</th>
            <th>Operation</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {orderList.length > 0 ? (
            orderList.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td className="text text-success font-weight-bold">{item._id}</td>
               
                  <td>
                    {item.pizzaItems.map((e, i) => (
                      <div key={i}>{e.name}</div>
                    ))}
                  </td>
                  <td>
                    {item.pizzaItems.map((e, i) => (
                      <div key={i}>{e.category}</div>
                    ))}
                  </td>
                  <td>
                    {item.pizzaItems.map((e, i) => (
                      <div key={i}>${e.price}</div>
                    ))}
                  </td>
                  <td>{new Date(item.time).toLocaleDateString()}</td>
                  <td>{new Date(item.time).toLocaleTimeString()}</td>
                  <td>${item.total}</td>
                  <td>
                      {
                      
                      status ? (
                        <samp>Payment Done</samp>
                      ) : (
                        <button className="btn btn-warning mr-3"  onClick={() => handlePayNow(item.price, [item], false, true)}>
                        
                            Pay Now
                        </button>
                      )}
                      <button onClick={() => deleteManyPayPizaaOrder(item._id)} className="btn btn-warning">
                        Order Cancel
                      </button>
                      
                    </td>
                    <td>1.{preCount1}-------- 2.{prevCount} --------- 3.{preCount2}</td>
                   
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="text-primary">
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

export default UserOrderPayManyPizza;