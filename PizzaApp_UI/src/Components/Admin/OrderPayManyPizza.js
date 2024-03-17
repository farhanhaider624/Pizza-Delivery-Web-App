import React, { useEffect, useState } from "react";
import PayManyPizzaServices from "../../Services/PayManyPizzaServices";
import io from 'socket.io-client';

const OrderPayManyPizza = () => {
  const [orderList, setOrderList] = useState([]);
  const [customerNames, setCustomerNames] = useState({});
  const[message,setMessage]=useState("");

 
  const socket =io.connect("http://localhost:8000");

  useEffect(() => {
    getPayManyPizzaOrder();
  }, []);

  useEffect(() => {
    const fetchCustomerNames = async () => {
      const names = await Promise.all(
        orderList.map(async (item) => {
          return {
            id: item.userId,
            name: await getCustomerName(item.userId),
          };
        })
      );

      const customerNames = {};
      names.forEach((item) => {
        customerNames[item.id] = item.name;
      });

      setCustomerNames(customerNames);

      socket.on("success", (data) => {
        console.log("data.data:-"+data.data);
        setMessage(data.data);
        localStorage.setItem('success',JSON.stringify(data.data));
      
  })
     
    };

    fetchCustomerNames();
  }, [orderList]);

  const privousMeassage=JSON.parse(localStorage.getItem('success'));

  const getPayManyPizzaOrder = async () => {
    try {
      let result = await PayManyPizzaServices.getPayManyPizzaOrder();
      setOrderList(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getCustomerName = async (id) => {
    try {
      let result = await fetch(`http://localhost:8000/get-user/${id}`);
      result = await result.json();
      return result.name; // Return the result from the fetch request
    } catch (error) {
      console.error("Error:", error);
      return null; // Return null or handle the error as per your requirement
    }
  };

  const deleteManyPayPizaaOrder = async (id) => {
    localStorage.removeItem('success');
    try {
      let result = await PayManyPizzaServices.deleteManyPayPizaaOrder(id);
      if (result) {
        getPayManyPizzaOrder();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const accepted_Order = (userId) => {
    const room =  userId ;
    console.log(" user id: " + userId );
    socket.emit("accepted_Order", { data: "order accepted", room: room });
  };
  
  const in_kitchen_Order = (userId) => {
    const room =  userId ;
    console.log(" user id: " + userId);
    socket.emit("in_kitchen_Order", { data: "order in kitchen", room: room });
  };
  
  const order_Send = (userId) => {
    const room =  userId ;
    console.log(" user id: " + userId);
    socket.emit("order_Send", { data: "order Send", room: room });
  };
  
  // Inside your JSX component
  
  

  return (
    <div className="product-list">
      <h6 className="text text-left text-primary">Order Bulk Pizza List</h6>
      <table className="table"  style={{backgroundColor:"rgb(174, 219, 236)"}}>
        <thead style={{backgroundColor:"skyblue"}}>
          <tr>
            <th>Order No</th>
            <th>User Name</th>
            <th>Pizza Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Date</th>
            <th>Time</th>
            <th>Total Price</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {orderList.length > 0 ? (
            orderList.map((item, index) => {
              const customerName = customerNames[item.userId];
             

              return (
                <tr key={item._id}>
                  <td className="text text-success font-weight-bold">{item._id}</td>
                  <td>{customerName}</td>
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
                     
                  <label>
                      <input type="radio" name={`orderStatus_${item._id}`} value="accepted" onClick={() => accepted_Order(item.userId)}  /> Accepted
                  </label>
                  <label>
                      <input type="radio" name={`orderStatus_${item._id}`} value="in_kitchen" onClick={() => in_kitchen_Order(item.userId)} /> In Kitchen
                  </label>
                  <label>
                      <input type="radio" name={`orderStatus_${item._id}`} value="delivered" onClick={() => order_Send(item.userId)}/> Delivered
                  </label>
  
                  </td>
                  <td>
                    <button onClick={() => deleteManyPayPizaaOrder(item._id)}>Order Done</button>
                  </td>
                   <td>{privousMeassage}</td>
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
  );
};

export default OrderPayManyPizza;
