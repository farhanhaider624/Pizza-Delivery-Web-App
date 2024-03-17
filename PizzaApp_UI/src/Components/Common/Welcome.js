import React from "react";
import logo from '../../assets/logo/logo_pizza.PNG';

const UserWelcome = ()=>{
    const auth=localStorage.getItem('user');
    const user=JSON.parse(auth);
    
    return (
        <React.Fragment>
         <div style={welcomeName}>Welcome  To {user.name}</div>
         <img
          src={logo}
          style={logoStyle}
          alt="logo"
        />
        </React.Fragment>
    )
}

export default UserWelcome;

let welcomeName = {
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    margin: '0 auto',
    color: 'blue',
    textAlign: 'center',
    padding: '50px',
    width: '1000px',
    fontStyle: 'italic',
    fontFamily: 'cursive',
    fontWeight: 'bold',
    fontSize: 'xxx-large',
    zIndex: '1',
  };
  

 let logoStyle={
    borderRadius: '100px',
    border: '5px solid skyblue',
    width: '400px',
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)', 
 }