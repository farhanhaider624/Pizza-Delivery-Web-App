import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationServices from "../../Services/RegistrationServices";

const SingUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[mobile,setMobile]=useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(false);
  const[is_varified,setIsVarified]=useState(1);
  const[is_admin,setIsAdmin]=useState(0);
  const[emailVerifyMeassage,setEmailVerifyMeassage]=useState("");
  const[em,setEm]=useState(false);
 
  const navigate=useNavigate();
  
  // When SingUp Then Not open SingUP Button:-
  useEffect(()=>{
          
  },[]);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };
  
  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
    if (!passwordRegex.test(value)) {
      setPasswordError('Password must contain at least one letter, one number, and be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  const collectData = async () => {
    if (!name || !mobile || !password || !email) {
      setError(true);
      return false;
    }
    console.log(name, email, password,mobile);
    let result = await RegistrationServices.collectData(name,email,password,mobile,is_varified,is_admin);
    console.log(result);
    if (result.message) {
      // Display an error message to the user
     setErrorMessage(result.message);
    } else {
      // Registration successful
      // localStorage.setItem('user', JSON.stringify(result));
      setTimeout(() => {
        navigate('/login');
      }, 10000);
      
      setEm(true);
      setEmailVerifyMeassage("Please Verify Youre Email Send Verify Link OnYour Mail");
    }
  };
  return (
    <>
    { em  && <div className="alert alert-success bg-success">{emailVerifyMeassage}</div>}
      <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Register</h1>
              <form>
              {
                errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>)
              }  
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <label>
                    {error && !name && (
                      <span className="invalid-input">
                        Enter Name.
                      </span>
                    )}
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <label>
                    {error && !email && (
                      <span className="invalid-input">
                        Enter email Address.
                      </span>
                    )}
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
                  <label htmlFor="mobile" className="form-label">
                    Mobile Number
                  </label>
                  <label>
                    {error && !mobile && (
                      <span className="invalid-input">
                        Enter Mobile Number.
                      </span>
                    )}
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter your mobile number"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <label>
                    {error && !email && (
                      <span className="invalid-input">
                        Enter Password.
                      </span>
                    )}
                  </label>
                  <label>
                  {passwordError && <div className="text-danger">{passwordError}</div>}
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                  />
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={collectData}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SingUp;
