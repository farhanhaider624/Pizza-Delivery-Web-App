import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ingredients from "./Ingredients";
import PizzaServices from "../../Services/PizzaServices";

const PizzaList=()=>{
    const [pizzas,setPizzas]=useState([]);

     useEffect(()=>{
           getPizza();
     },[]);
     
    const getPizza = async()=>{
        let result= await PizzaServices.getPizzas();
        setPizzas(result);
        console.log(pizzas);
   }

   const deletePizza = async (id) => {
     console.log(id);
     let result = await PizzaServices.deletePizza(id);
     if (result) {
       getPizza();
     }
   }; 

   const searchHandle=async (event)=>{
    console.log("Search");
    let key=event.target.value;
    if(key){
        let result=await PizzaServices.searchHandle(key);
        if(result){
                setPizzas(result);
        }
    }else{
        getPizza();
    }
   
   }
    return (
      <div className="container">
        <h1 style={mainheading}>Available Pizza List</h1>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search Product"
          onChange={searchHandle}
        />

        <div className="row">
          {pizzas.length > 0 ? (
            pizzas.map((item) => (
              <div className="col-md-3 mb-4" key={item._id}>
                <div className="card">
                  <img
                    src={item.pizaImage}
                    className="card-img-top"
                    alt={item.name}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">${item.price}</p>
                    <p className="card-text">{item.category}</p>
                    <p className="card-text">{item.ingredients}</p>

                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-danger"
                        onClick={() => deletePizza(item._id)}
                      >
                        Delete
                      </button>
                      <button className="btn btn-success ">
                        <Link className="text-white" to={"/update-pizza/" + item._id}>Update</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-primary">No Results Found</h1>
          )}
        </div>
        <div>
          <Ingredients  />
        </div>
      </div>
    );
    
}

export default PizzaList;

let mainheading={
  color: 'black',
  fontSize: '30px',
  fontStyle: 'normal',
  fontWeight: '900',
  // border: '5px solid skyblue',
  textAlign: 'center',
  width: '350px',
  margin: 'auto',
  padding: '10px',
  marginBottom: '5px',
  marginTop:'5px'
}