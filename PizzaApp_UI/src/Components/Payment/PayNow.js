import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PayNow = () => {
    const navigate =useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handlePayment();
    };

 
  
    const handlePayment = async () => {
        
      
         
      };
      
  
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <h3>Pay Now</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address:</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile:</label>
            <input
              type="tel"
              className="form-control"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Proceed to Next Page</button>
        </form>
      </div>
    </div>
  );
};

export default PayNow;
