class RegistrationServices{
    collectData = async (name,email,password,mobile,is_varified,is_admin) => {
        let result = await fetch("http://127.0.0.1:8000/register", {
          method: "post",
          body: JSON.stringify({ name, email, password ,mobile,is_varified,is_admin}),
          headers: {
            "Content-Type": "application/json",
          },
        });
        result = await result.json();
        return result ;
        
      };

      handleLogin=async(email,password)=>{
        let result=await fetch("http://localhost:8000/login",{
           method:'post',
           body:JSON.stringify({email,password}),
           headers:{
               'Content-Type':'application/json'
           }
        });
        result=await result.json();
        return result;
        
      }; 

      handleResetPassword = async (email,mobile,newPassword) => {
        let result = await fetch("http://localhost:8000/forgot", {
          method: "put",
          body: JSON.stringify({ email, mobile, newPassword }),
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        result = await result.json();
        return result;
      };

      


}

export default new RegistrationServices();