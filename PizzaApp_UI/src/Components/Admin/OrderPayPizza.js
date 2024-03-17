import React, { useEffect, useState } from "react";
import PayPizzaService from "../../Services/PayPizzaService";
import io from "socket.io-client";

const OrderPayPizza = () => {
  const [orderList, setOrderList] = useState([]);
  const [customerNames, setCustomerNames] = useState({});
  const [message, setMessage] = useState("");

  const socket = io.connect("http://localhost:8000");
  useEffect(() => {
    getPayOrder();
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
    };
    socket.on("success", (data) => {
      console.log("data.data:-" + data.data);
      setMessage(data.data);
      localStorage.setItem("success", JSON.stringify(data.data));
    });
    fetchCustomerNames();
  }, [orderList]);

  const privousMeassage = JSON.parse(localStorage.getItem("success"));

  const getPayOrder = async () => {
    try {
      let result = await PayPizzaService.getPayOrder();
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
  const deletePayPizaaOrder = async (id) => {
    localStorage.removeItem("success");
    console.log(id);
    try {
      let result = await PayPizzaService.deletePayPizaaOrder(id);
      if (result) {
        getPayOrder();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const accepted_Order = (userId) => {
    const room = userId;
    console.log(" user id: " + userId);
    socket.emit("accepted_Order", { data: "order accepted", room: room });
  };

  const in_kitchen_Order = (userId) => {
    const room = userId;
    console.log(" user id: " + userId);
    socket.emit("in_kitchen_Order", { data: "order in kitchen", room: room });
  };

  const order_Send = (userId) => {
    const room = userId;
    console.log(" user id: " + userId);
    socket.emit("order_Send", { data: "order Send", room: room });
  };
  return (
    <div className="product-list mb-5">
      <h6 className="text text-left text-primary">Order Single Pizza List</h6>
      <table
        className="table"
        style={{ backgroundColor: "rgb(174, 219, 236)" }}
      >
        <thead style={{ backgroundColor: "skyblue" }}>
          <tr>
            <th>Order.No</th>
            <th>User Name</th>
            <th>Pizza Name</th>
            <th>Category</th>
            {/* <th>Ingredients</th> */}
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
                  <td className="text text-success font-weight-bold">
                    {item._id}
                  </td>
                  <td>{customerName}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  {/* <td>{item.ingredients}</td> */}
                  <td>{new Date(item.time).toLocaleDateString()}</td>
                  <td>{new Date(item.time).toLocaleTimeString()}</td>
                  <td>${item.price}</td>
                  <td>
                    <label>
                      <input
                        type="radio"
                        name={`orderStatus_${item._id}`}
                        value="accepted"
                        onClick={() => accepted_Order(item.userId)}
                      />{" "}
                      Accepted
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`orderStatus_${item._id}`}
                        value="in_kitchen"
                        onClick={() => in_kitchen_Order(item.userId)}
                      />{" "}
                      In Kitchen
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`orderStatus_${item._id}`}
                        value="delivered"
                        onClick={() => order_Send(item.userId)}
                      />{" "}
                      Delivered
                    </label>
                  </td>
                  <td>
                    <button onClick={() => deletePayPizaaOrder(item._id)}>
                      Order Done
                    </button>
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

export default OrderPayPizza;
