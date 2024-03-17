const nodemailer = require('nodemailer');

// Create a transporter with your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: 'your-email-service-provider',
  auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password',
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'your-email@example.com',
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;
