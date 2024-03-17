
class PayManyPizzaServices{

    getPayManyPizzaOrder = async () => {
        try {
          let result = await fetch("http://localhost:8000/get-all-many-pay-pizza");
          result = await result.json();
          return result;
        } catch (error) {
          console.error("Error:", error);
        }
      };

      deleteManyPayPizaaOrder = async (id) => {
        try {
          let result = await fetch(`http://localhost:8000/delete-many-pay-pizza/${id}`, {
            method: "DELETE",
          });
          result = await result.json();
          return result;
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
      deleteManyPayPizza = async (total) => {
        try {
          let result = await fetch(`http://localhost:8000/delete-many-pay-pizza-item/${total}`, {
            method: "DELETE",
          });
          result = await result.json();
          return result;
        } catch (error) {
          console.error("Error:", error);
        }
      };

      handlePayNow = async (paymentData) => {
        try {
          let result = await fetch("http://localhost:8000/add-many-pay-pizza", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          });
          result = await result.json();
          return result;
        } catch (error) {
          console.error("Error:", error);
        }
      };

      getPayManyPizzaOrderId = async (_id) => {
        try {
          let result = await fetch(`http://localhost:8000/get-many-pay-pizza/${_id}`);
          result = await result.json();
          return result;
        } catch (error) {
          console.error("Error:", error);
        }
      };
}

export default new PayManyPizzaServices();