# Pizza-Delivery-Web-App
𝗢𝗜𝗕𝗦𝗜𝗣 𝗧𝗔𝗦𝗞 -3 Web Development and Designing || Pizza App:-
Project Description:

The goal of this project is to create a custom pizza ordering system with user and admin functionalities. The app will be built using React for the frontend, Node.js for the backend, and MongoDB for the database. The app will have the following features:

1. User and Admin Authentication:
   - Users can register, login, and verify their email addresses.
   - Users can reset their passwords if they forget them.
   - Admins can log in to access the admin dashboard.

2. User Dashboard:
   - After logging in, users can view the available pizza varieties.
   - Users can customize their pizza by selecting a base, sauce, cheese, and veggies.
   - Users can proceed to checkout using the Razorpay payment gateway.

3. Admin Dashboard:
   - Admins can manage the inventory of pizza ingredients such as base, sauce, cheese, veggies, and meat.
   - Admins can view the current stock of ingredients and update them as necessary.
   - Admins receive notifications when the available stock goes below a threshold value.
   - Admins can view and manage incoming orders.

4. Order Management:
   - After placing an order, the necessary changes in stock are automatically updated.
   - Admins can change the status of the order (order received, in the kitchen, sent to delivery).
   - Users can track the status of their orders in the user dashboard.

5. Email Notifications:
   - Users receive email verification links and password reset instructions.
   - Admins receive notifications when the available stock goes below the threshold value.
   - Users receive order confirmation and status update notifications.

6. Integration:
   - Integrate the Razorpay checkout system for payment processing.
   - Use React Router for client-side routing.
   - Use Axios for making API calls between the frontend and backend.
   - Use Mongoose as the MongoDB object modeling tool for data manipulation.

The project will involve creating frontend components using React, setting up the Node.js server and API routes, integrating the MongoDB database, implementing authentication and authorization functionalities, integrating the Razorpay payment gateway, managing inventory, and handling email notifications.




Task_3:-

1. Create a full stack app using React, MongoDB, and Nodejs.
2. Create an admin login and a user login with complete registration, authorization, email verification, and forgot password system.
3. After logging in, users should be able to view the available pizza varieties in the dashboard.
4. Users can start making the custom pizza with the following flow.
• Choose any pizza base from 5 options.
• Next, choose any sauce from 5 options.
• Select a cheese type.
• Opt veggies from many options.
5.Integrate the razor pay checkout for payment. Create a dummy account and integrate the test mode. In test mode, on
clicking success, place and confirm the order.
6. In the admin login, create a mini inventory management system keeping track of available pizza base, sauce, cheese, veggies, and meat.
7. After an order, update the necessary changes in stock and present them in the admin dashboard.
8. Schedule a notification to the admin email id when the available stock goes beyond the threshold value. (e.g. the total pizza base is below 20 after so many consecutive orders, trigger an email)
9. Admin must receive the order and change the status of the pizza- as order received, In the kitchen, and Sent to delivery.
10. For every update from the admin, the status change must be reflected in the user dashboard






















58. 

