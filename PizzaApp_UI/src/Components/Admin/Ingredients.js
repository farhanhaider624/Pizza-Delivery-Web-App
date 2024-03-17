import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminIngredientsServices from "../../Services/AdminIngredientsServices";
import CountServices from "../../Services/CountServices";
import io from "socket.io-client";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [count, setCount] = useState(0);
  const socket = io.connect("http://localhost:8000");
 
  useEffect(() => {
    getIngredients();
    getCount();
  }, []);

  const getCount = async () => {
    try {
      const result = await CountServices.getCount();
      setCount(result);
      console.log(count);
    } catch (error) {
      console.error(error);
    }
  };

  const getIngredients = async () => {
    try {
      const data = await AdminIngredientsServices.getIngredients();
      setIngredients(data);
      console.log(ingredients);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteIngredient = async (id) => {
    try {
      const result = await AdminIngredientsServices.deleteIngredient(id);
      if (result) {
        getIngredients();
      }
    } catch (error) {
      console.error(error);
    }
  };
 
 const sendEmailToAdmin = (ingredients) => {
   console.log(" ingredients: " + ingredients);
   const auth = localStorage.getItem("user");
   const user = JSON.parse(auth);

   socket.emit("limit", {
     data: `Pizza ${ingredients} availability less than 10`,
     userEmail: user.email,
   });
 };
  
 

  return (
    <div className="container bg-white p-4 mb-5">
      <h3 style={mainheading}>Available Ingredients List</h3>
      {ingredients.length > 0 ? (
        ingredients.map((item, index) =>
          {
            if (item.base - count < 10) {
              
              sendEmailToAdmin("Base");
        
             
            }
            if (item.sauce - count < 10) {
              sendEmailToAdmin("Sauce");
            }
            if (item.cheese - count < 10) {
              sendEmailToAdmin("Cheese");
            }
            if (item.Veggies - count < 10) {
              sendEmailToAdmin("Veggies");
            }
          
        return (
          <div
            className="d-flex align-items-center justify-content-between  p-2 mb-3"
            key={item._id}
          >
            <div className="card shadow rounded p-3" style={outerBox}>
              <div className="d-flex flex-column text text-center" style={innerBox}>
              <span style={heading}>Base</span>
                <span
                  className={`font-weight-bold ${
                    item.base - count < 10 ? "text-danger" : ""
                  }`}
                >
                  {item.base - count < 10 ? "<10" : item.base - count}
                </span>
                
              </div>
            </div>
            <div className="card shadow rounded p-3" style={outerBox}>
              <div className="d-flex flex-column text text-center"  style={innerBox}> 
              <span style={heading}>Sauce</span>
                <span
                  className={`font-weight-bold ${
                    item.sauce - count < 10 ? "text-danger" : ""
                  }`}
                >
                  {item.sauce - count < 10
                    ?  "<10" 
                    : item.sauce - count}
                </span>
                
              </div>
            </div>
            <div className="card shadow rounded p-3" style={outerBox}>
              <div className="d-flex flex-column text text-center" style={innerBox}>
              <span style={heading}>Cheese</span>
                <span
                  className={`font-weight-bold ${
                    item.cheese - count < 10 ? "text-danger" : ""
                  }`}
                >
                  {item.cheese - count < 10
                    ?  "<10" 
                    : item.cheese - count}
                </span>
                
              </div>
            </div>
            <div className="card shadow rounded p-3" style={outerBox}>
              <div className="d-flex flex-column text text-center" style={innerBox}>
              <span style={heading}>Veggies</span>
                <span
                  className={`font-weight-bold ${
                    item.Veggies - count < 10 ? "text-danger" : ""
                  }`}
                >
                  {item.Veggies - count < 10
                    ?  "<10" 
                    : item.Veggies - count}
                </span>
               
              </div>
            </div>

            <div>
              {/* <button onClick={() => deleteIngredient(item._id)} className="btn btn-danger mr-2">Delete</button> */}
              <button className="btn btn-primary">
                <Link
                  to={"/update-ingredients/" + item._id}
                  className="text-white"
                >
                  Update
                </Link>
              </button>
            </div>
          </div>
        );
                  })
      ) : (
        <h1 className="text-primary">No Results Found</h1>
      )}
    </div>
  );
};

export default Ingredients;


let outerBox={
  width:'220px',
  height:'220px',
  backgroundColor: 'skyblue',
  border: 'solid 2px rosybrown'
}

let innerBox={
  color:'blue',
  fontWeight: 'bold',
  fontSize: 'xx-large',
  background: 'white',
  padding: '33px',
  borderRadius: '60px',
  marginTop: '8px'
}

let heading={
  color: 'cadetblue'
}

let mainheading={
    color: 'black',
    fontSize: '25px',
    fontStyle: 'normal',
    fontWeight: '900',
    // border: '5px solid skyblue',
    textAlign: 'center',
    width: '350px',
    margin: 'auto',
    padding: '10px',
    marginBottom: '12px'
}