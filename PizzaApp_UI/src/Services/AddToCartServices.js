class AddToCartServices{


    getAddToCartPizza = async (_id) => {
        try {
          let result = await fetch(`http://localhost:8000/get-cart-pizza/${_id}`);
          result = await result.json();
          return result;
        } catch (error) {
          console.error("Error:", error);
        }
      };

    deleteAddToCartPizza = async (id) => {
        try {
          let result = await fetch(`http://localhost:8000/delete-cart-pizza/${id}`, {
            method: "Delete",
          });
          result = await result.json();
          return result;
        } catch (error) {
          console.error("Error:", error);
        }
      };

      addToCart = async (data) => {
      try {
        let result = await fetch("http://localhost:8000/add-to-cart", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        result = await result.json();
        return result;
      } catch (error) {
        console.error("Error:", error);
      }
    };

}

export default new AddToCartServices();