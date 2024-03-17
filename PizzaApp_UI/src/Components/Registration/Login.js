import React, { useEffect, useState }  from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RegistrationServices from "../../Services/RegistrationServices";


const Login=()=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState(false);
  const[errorMessage,setErrorMessage]=useState("");

 
  
  const navigate=useNavigate();

  useEffect(()=>{
    const auth=localStorage.getItem('user');
    if(auth){
        navigate('/');
    }
  },[]);

  const handleLogin=async()=>{
         console.log(email,password);
         let result=await RegistrationServices.handleLogin(email,password);
         console.log(result);
         if(result.name){
            localStorage.setItem('user',JSON.stringify(result));
            navigate('/');
         }else if(result.result){
          setError(true);
          setErrorMessage(result.result);
         }
  }

  const handleForgotPassword = () => {
      navigate('/forgot-password');
  };

   return (
    <div className="container mt-5">
      {
        error && <div className="alert alert-primary  text text-center text-danger" style={{width:'50%',margin:'auto',fontWeight:'bold'}}>{errorMessage}</div>
      }
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title text-center">Login</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <div className="text-center ">

                
                <button
                 className="btn btn-primary mx-5 "
                 type="button"
                 onClick={handleForgotPassword}
               >
                 Forgot Password
               </button>

                
                
                <button
                  className="btn btn-primary mx-5"
                  type="button"
                  onClick={handleLogin}
                >
                  Login
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
   )
}

export default Login;