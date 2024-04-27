import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import About from './Pages/About';
import Cart from './Pages/Cart';
import Order from './Pages/Order';
import Header from './Components/Header';
import PrivateRoute from './Components/PrivateRoute';
import UserHeader from './Components/UserHeader';
import CreateAddress from './Pages/CreateAddress';
import Address from './Pages/Address';
import CreateListings from './Pages/CreateListings';
import Responsive from './Components/Responsive';
import PlaceOrder from './Pages/PlaceOrder';
import ContinueOrder from './Pages/ContinueOrder';
import Payment from './Pages/Payment';
import OrderDetails from './Pages/OrderDetails';
import Search from './Pages/Search';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path="/responsive" component={Responsive} />
        <Route path='/create-address' element={<CreateAddress />} />
        <Route path='/address' element={<Address />} />
        <Route path='/create-listings' element={<CreateListings />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='order/:orderId' element={<OrderDetails />} />
        <Route path='/continue-order' element={<ContinueOrder />} />
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/payment' element={<Payment />} />
      </Routes>

      <UserHeader />
    </BrowserRouter>
  )
}

export default App
