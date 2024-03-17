import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo/logo_pizza.PNG';

function Nav() {
  const navigate = useNavigate();

  const auth = localStorage.getItem("user");
  const user = auth ? JSON.parse(auth) : null;

  const logout = () => {
    localStorage.clear("user");
    // navigate("/login");
  };

  const admin = () => {
    if (user) {
      const { _id, name } = user;
      if (auth && _id === "649aa82066e14a83284b4987" && name === "Admin") {
        return (
          <>
            <ul className="nav-ul">
              <li>
                <button style={button}>
                  {" "}
                  <Link to="/pizza-list">All Pizza</Link>
                </button>
              </li>
              <li>
                <button style={button}>
                  {" "}
                  <Link to="/add-pizza">Add Pizza</Link>
                </button>
              </li>
              <li>
                <button style={button}>
                  <Link to="/get-custom-pizza">Order Custom Pizza</Link>
                </button>
              </li>

              <li>
                <button style={button}>
                  <Link onClick={logout} to="/login">
                    Logout
                  </Link>
                </button>
              </li>
              <li style={login_person}>Welocome To {JSON.parse(auth).name}</li>
            </ul>
          </>
        );
      } else {
        return (
          <>
            <ul className="nav-ul">
              <li >
                <button style={button}>
                  <Link to="/user-pizza-list">User Pizza list</Link>
                </button>
              </li>

              <li >
                <button style={button}>
                  <Link to="/add-to-cart">Add To Cart</Link>
                </button>
              </li>
              <li >
                <button style={button}>
                  <Link onClick={logout} to="/login">
                    Logout
                  </Link>
                </button>
              </li>
              <li style={login_person}>Welocome To {JSON.parse(auth).name}</li>
            </ul>
          </>
        );
      }
    }

    <></>;
  };

  return (
    <>
      <div className="nav-container">
        <img
          src={logo}
          className="logo"
          alt="logo"
        />
        {auth ? (
          admin()
        ) : (
          <ul className="nav-ul nav-right">
            <li>
              <button style={button}>
                <Link to="/signUp">Sing Up</Link>
              </button>
            </li>

            <li>
              <button style={button}>
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default Nav;


let button={
  backgroundColor: 'skyblue',
  borderRadius: '12px',
  border: '2px solid black',
  padding: '6px',
}

let login_person={
    float: 'right',
    margin: '10px',
    fontSize: 'large',
    fontWeight: '900',
    color: 'darkblue',
    fontFamily: 'cursive'
}

let footer={
   
  position: 'fixed',
  left: '0',
  bottom: '0',
  width: '100%',
  height: '40px',
  backgroundColor: 'skyblue',
  padding: '0px',
  textAlign: 'center',
 

}