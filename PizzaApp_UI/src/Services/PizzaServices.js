class PizzaService {

    addPizza = async (name, price, category, ingredients, pizaImage) => {
      try {
        let result = await fetch("http://localhost:8000/add-pizza", {
          method: 'post',
          body: JSON.stringify({ name, price, category, ingredients, pizaImage }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        result = await result.json();
        console.log(result);
        return result;
      } catch (error) {
        console.error(error);
      }
    };


    getPizzaDetails = async (id) => {
      try {
        const response = await fetch(`http://localhost:8000/get-single-pizza/${id}`);
        const result = await response.json();
        return result;
      } catch (error) {
        console.error(error);
      }
    };

    updatePizza = async (id, name, price, category, ingredients, pizaImage) => {
      try {
        const response = await fetch(`http://localhost:8000/update-pizza/${id}`, {
          method: 'put',
          body: JSON.stringify({ name, price, category, ingredients, pizaImage }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const result = await response.json();
        return result;
      } catch (error) {
        console.error(error);
      }
    };


    getPizzas = async()=>{
      let result= await fetch("http://localhost:8000/all-pizza");
      result=await result.json();
      return result;
   };

   deletePizza = async (id) => {
    let result = await fetch(`http://localhost:8000/delete-pizza/${id}`, {
      method: "Delete",
    });

    result = await result.json();
    return result;
  };

  searchHandle=async (key)=>{
        let result=await fetch(`http://localhost:8000/search/${key}`);
        result=await result.json();
        return result;

  };
}
  export default new PizzaService();
  