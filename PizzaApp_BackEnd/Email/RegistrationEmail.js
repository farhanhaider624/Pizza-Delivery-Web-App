const nodemailer=require('nodemailer');

//Send Mail:-
module.exports.registrationEmail= async(userName ,userEmail,userId,userPassword,userMobile)=>{
    try 
    {

      // Create a transporter with your email service provider configuration
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: "your-email",
            pass: "your-password",
          },
        });

      // Create the email template with the verification link containing the token
        const emailOptions = {
            from: "your-email",
            to: userEmail,
            subject: "Suceessfully  Registration Completed",
            html: ` <h1 style="color: blue;">Welcome To Pizza App .</h1>
            <h2 style="color: green;">This Is Your UserId ${userId}.</h2>
            <h2 style="color: green;">Name:-${userName}.</h2>
            <h2 style="color: green;">Email:-${userEmail}.</h2>
            <h2 style="color: green;">Password:-${userPassword}.</h2>
            <h2 style="color: green;">Mobile:-${userMobile}.</h2>
            <h2>Please Verify Email Link Also Send Your Registor Eamil Id.</h2>`,
          };

      // Send the email
        transporter.sendMail(emailOptions, (error, info) => {
          if (error) {
            console.log("Error sending verification email:", error);
          } else {
            console.log("Verification email sent:", info.response);
            console.log(emailOptions);     
          }
        });
                 
    } catch (error) 
    {
         console.log(error.massage);       
    }
}