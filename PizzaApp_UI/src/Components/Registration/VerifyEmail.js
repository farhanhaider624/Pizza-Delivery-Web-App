import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function VerifyEmail() {
  const { token } = useParams();
  const [verificationMessage, setVerificationMessage] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    // Send a request to your backend API to verify the email
    const verifyEmail = async () => {
      try {
        const response = await fetch(`/verify-email?token=${token}`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setVerificationMessage(data.message);
        } else {
          setVerificationMessage('Email verification failed');
        }
      } catch (error) {
        console.log(error);
        setVerificationMessage('Email verification Done');
        setTimeout(()=>{
           
            navigate('/login');
        },5000)
        
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className='text-center mt-5'>
      <h2>Email Verification</h2>
      <p>{verificationMessage}</p>
    </div>
  );
}

export default VerifyEmail;
