import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import image1 from "../../assets/images/image-1.PNG";
import image2 from "../../assets/images/image-2.PNG";
import image3 from "../../assets/images/image-3.PNG";
import image4 from "../../assets/images/image-4.PNG";
import image5 from "../../assets/images/image-5.PNG";
import AdminPizzaServices from "../../Services/PizzaServices";

const UpdatePizza = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [pizaImage, setPizaImage] = useState("");
  const [error, setError] = useState(false);
  
  
  const navigate=useNavigate();
  const params=useParams();

  const pizzaOptions=["Pizza-1","Pizza-2","Pizza-3","Pizza-4","Pizza-5"];
  const pizzaCategory=["Veg","Non-Veg"];
  const pizzaImages=[image1,image2,image3,image4,image5];
  const pizzaIngredients=["I-1","I-2","I-3","I-4","I-5"];
  const pizzaPrice=['99','199','299','399','499'];

  useEffect(()=>{
            console.log(params);
            getPizzaDetails();
  },[])

  const getPizzaDetails = async () => {
    try {
      const result = await AdminPizzaServices.getPizzaDetails(params.id);
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setIngredients(result.ingredients);
      setPizaImage(result.pizaImage);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePizza = async () => {
    if (!name || !price || !category || !ingredients || !pizaImage) {
      setError(true);
      return false;
    }

    console.log(name, price, category, ingredients, pizaImage);

    try {
      const result = await AdminPizzaServices.updatePizza(params.id, name, price, category, ingredients, pizaImage);
      console.log(result);
      if (result) {
        navigate('/pizza-list');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-2 mb-5" style={{width:'50%' ,backgroundColor:'white',height:'auto'}}>
      <div className="text-center">
      <h2>Update Pizza</h2>
      </div>
    <div className="form-group">
      <select className="form-control" value={name} onChange={(e) => { setName(e.target.value);}}>
        
        <option value="">Select Pizza Name</option>
        {pizzaOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select><br/>
      {error && !name && <span className="invalid-input">Enter Valid Name</span>}
     
    </div>
    <div className="form-group">
      <select className="form-control  " value={price} onChange={(e) => { setPrice(e.target.value);}}>
        <option value="">Select Pizza Price</option>
        {pizzaPrice.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select><br/>
      {error && !price && <span className="invalid-input">Enter Price</span>}
    </div>
    <div className="form-group">
      <select className="form-control " value={category} onChange={(e) => { setCategory(e.target.value);}}>
        <option value="">Select Pizza Category</option>
        {pizzaCategory.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select><br/>
      {error && !category && <span className="invalid-input">Enter Category</span>}
    </div>
    <div className="form-group">
      <select className="form-control" value={pizaImage} onChange={(e) => { setPizaImage(e.target.value);}}>
        <option value="">Select Pizza Image</option>
        {pizzaImages.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select><br/>
      {error && !pizaImage && <span className="invalid-input">Enter Image</span>}
    </div>
    <div className="form-group">
      <select className="form-control" value={ingredients} onChange={(e) => { setIngredients(e.target.value);}}>
        <option value="">Select Pizza Ingredients</option>
        {pizzaIngredients.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select><br/>
      {error && !ingredients && <span className="invalid-input">Enter Ingredients</span>}
    </div>
    <div className="text-center ">
      <button type="button" onClick={updatePizza} className="btn btn-primary appButton text-dark">Add Pizza</button>
    </div>
  </div>
  
  )
}

export default UpdatePizza;
