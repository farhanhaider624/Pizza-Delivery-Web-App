
import './App.css';

import Footer from './Components/Common/Footer';
import Nav from './Components/Common/Nav';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import SingUp from './Components/Registration/SignUp';
import PrivateComponet from './Components/Common/PrivateComponet';
import Login from './Components/Registration/Login';

import AddPizza from './Components/Admin/AddPizza';
import PizzaList from './Components/Admin/PizzaList';
import UpdatePizza from './Components/Admin/UpdatePizza';
import UserPizzaList from './Components/Users/UserPizzaList';
import UpdateIngredients from './Components/Admin/UpdateIngredients';
import OrderCustomPizza from './Components/Admin/OrderCustomPizza';
import AddToCart from './Components/Users/AddToCart';
import PaymentComponent from './Components/Payment/PaymentComponent';
import PayNow from './Components/Payment/PayNow';
import ForgotPassword from './Components/Registration/ForgotPassword';
import VerifyEmail from './Components/Registration/VerifyEmail';
import UserWelcome from './Components/Common/Welcome';

//App is commonet.
function App() {
  return  (
    <div>
      <BrowserRouter>
        <Nav/>
        <Routes>

          <Route element={<PrivateComponet />}>
        
          <Route path='/user-pizza-list' element={<UserPizzaList />} ></Route>
          <Route path='/add-to-cart' element={<AddToCart />} />
          <Route path='/payment' element={<PaymentComponent />} />
          <Route path='/pay-now' element={<PayNow />} />
          <Route path='/' element={<UserWelcome />} />
         
          

          
          <Route path='/pizza-list' element={<PizzaList />} ></Route>
          <Route path='/add-pizza' element={<AddPizza />} ></Route>
          <Route path='/update-pizza/:id' element={<UpdatePizza />} ></Route>
          <Route path='/update-ingredients/:id' element={<UpdateIngredients />} ></Route>
          <Route path='/get-custom-pizza' element={<OrderCustomPizza />} />
          {/* <Route path='/' element={<AdminWelcome />} /> */}
         
         
          
           
          </Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/signUp' element={<SingUp />} ></Route>
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
          
        </Routes>
     </BrowserRouter>
     
     <Footer/>
    </div>
  )   
  
}

export default App;
