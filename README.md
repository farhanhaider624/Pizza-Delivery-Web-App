# oibsip_task_3
𝗢𝗜𝗕𝗦𝗜𝗣 𝐉𝐮𝐧𝐞- 𝐏2 𝗧𝗔𝗦𝗞 -3 Web Development and Designing || Pizza App:-
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
11. Registration Page:-
12. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/c27dacdc-32f8-4300-af11-387b159f7564)
13. After Completed Registration Then Verify Your Registration Email Then You Used This App Fuctionality.
14. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/57db9b3d-ef5e-4bac-94ed-2a3b409551c5)
15. Click On Verify Link:-
16. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/424a3954-1a2b-44fb-9cf4-2cd718f72597)
17. Welcome Registration Email :-
18. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/5e844d6a-fe5a-40fe-a4fd-e9ebfc5d5212)
19. Login Page:-
20. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/fd76b2ee-676d-49f7-ab27-ea9d3988ef0d)
21. User Interface :-
22. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/3851fb52-f90f-438e-8daf-bb8255140539)
23. Here User Click On User Pizza List :-
24. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/48fdb688-90f5-475a-9166-b81270e805ba)
25. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/634d4694-fce0-4963-adb8-98b54c4f0a71)
26. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/89727ec6-f87b-4090-b46b-79028ffde89b)
27. Here User Click On Add To Cart:-
28. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/bb9f458f-347a-488e-9c47-4b7549ba0f5c)
29. Pay Now:-
30. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/246c0756-785a-41bc-9175-85f93d4e260b)
31. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/ab2b6833-8a7b-4d70-98ba-578e43aab691)
32. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/153f7596-f96a-4df6-bba0-beaa90cf466b)
33. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/81a5e24c-f1c2-46e7-b743-2861935e8bee)
34. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/60f55e2e-489d-42fe-9e91-58bb168b0c94)
35. When Admin Accpetd Order Look Like:-
36. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/20fc8bd2-649d-46b1-bf8a-9da365136c78)
37. When Order Done Then :-
38. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/38b7adfd-8a7f-440a-9652-d3fced179aef)
39. Here User Also Order Custome Pizza :-
40. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/d3dbf1b7-99ed-4531-b51c-339ff4ce070a)
41. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/3d11c764-025c-4a31-a5e6-07cbb2330058)
42. User Aslo Used Forgot Password :-
43. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/82113c4b-7dae-4e4b-acc6-7ba4d63ee446)
44. Admin Interface:-Here Some Off The Fuctionality Like Add Pizza Upadte Pizza ,Deleted Pizza,Avalible Ingredient.
45. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/97b7c6d7-df62-4765-8b78-0bef25849836)
46. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/d015ee80-d259-42ac-b16f-f6badc61c984)
47. Add Pizza :-
48. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/4db3d59d-86f8-42cc-aa79-8280931ba495)
49. Upadte Pizza:-
50. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/745a30d5-c2e3-4f45-b7bb-689833347dbd)
51. When Limit Of ingredient less than 10 then email send to Admin.
52. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/3cb402ee-b95c-4aeb-8516-c22700c103eb)
53. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/ef6d3427-2b07-405a-ba51-13209a980a05)
54. After Admin Add this In Ingredients:-
55. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/02541bf3-7a13-49d0-a06e-9ba3926b74aa)
56. Order See Here :-Update Satatus Of Pizza :-
57. ![image](https://github.com/chetanbnagmoti/oibsip_task_3/assets/119286565/9b6c6489-aea5-4f0a-b13d-c7e1d508498c)























58. 

