import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomPizzaServices from "../../Services/CustomPizzaServices";
import io  from 'socket.io-client';

const UserOrderPizza = () => {
  const [orderList, setOrderList] = useState([]);
  const[message,setMessage]=useState("");
  const message1 = useRef();
  const message2=useRef();

  const socket =io.connect("http://localhost:8000");
  
  const location=useLocation();
  const navigate=useNavigate();

  const { status } = location.state || { status: false };
  console.log(status);
  
  useEffect(() => {
    getCustomOrderId();
  }, []);
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

  const getCustomOrderId = async () => {
    const user = localStorage.getItem('user');
    const { _id } = JSON.parse(user);
    try {
      let result = await CustomPizzaServices.getCustomOrderId(_id);
      setOrderList(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteOrder = async (id) => {
    localStorage.removeItem('message');
    localStorage.removeItem('message1');
    localStorage.removeItem('message2');
    console.log(id);
    try {
      let result = await CustomPizzaServices.deleteOrder(id);
      if (result) {
        getCustomOrderId();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const [showCancelButton, setShowCancelButton] = useState(true);

  const handlePayNow = (total, pizzaItems, ok, custome) => {
    navigate("/payment", { state: { total, pizzaItems, ok, custome } });
  };
    

  return (
    <>
    <div>
      <h4 style={{fontWeight:'bold'}}>Order Pizza List</h4>
      <table className="table order-list" style={{backgroundColor:"white"}}>
        <thead>
          <tr>
            <th>Order.No</th>
            <th>Base</th>
            <th>Sauce</th>
            <th>Cheese</th>
            <th>Veggies</th>
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
                <td>{item.base}</td>
                <td>{item.sauce}</td>
                <td>{item.cheese}</td>
                <td>{item.Veggies}</td>
                <td>{new Date(item.time).toLocaleDateString()}</td>
                <td>{new Date(item.time).toLocaleTimeString()}</td>
                <td>${item.price}</td>
                <td>
                  {
                  
                  status ? (
                    <samp>Payment Done</samp>
                  ) : (
                    <button className="btn btn-warning mr-3"  onClick={() => handlePayNow(item.price, [item], false, true)}>
                    
                        Pay Now
                    </button>
                  )}
                  <button onClick={() => deleteOrder(item._id)} className="btn btn-warning">
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
    
  );
};

export default UserOrderPizza;
