import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationServices from "../../Services/RegistrationServices";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    validatePassword(value);
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must contain at least one letter, one number, and be at least 8 characters long"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleResetPassword = async () => {
    if (!email || !mobile || !newPassword) {
      setError(true);
      return false;
    }
    console.log(email, mobile, newPassword);
    let result = await RegistrationServices.handleResetPassword(email,mobile,newPassword);
    console.log(result);
    if (result.massage) {
      setErrorMessage(result.massage);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Forgot Password</h2>
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <label>
                    {error && !email && (
                      <span className="invalid-input">
                        Enter email Address.
                      </span>
                    )}
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile Number:
                  </label>
                  <label>
                    {error && !mobile && (
                      <span className="invalid-input">
                        Enter Mobile Number.
                      </span>
                    )}
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password:
                  </label>
                  <label>
                    {error && !newPassword && (
                      <span className="invalid-input">Enter New Password.</span>
                    )}
                  </label>
                  <label>
                    {passwordError && (
                      <div className="text-danger">{passwordError}</div>
                    )}
                  </label>
                 
                  <input
                    type="password"
                    className="form-control"
                    id="text"
                    name="newPassword"
                    value={newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
