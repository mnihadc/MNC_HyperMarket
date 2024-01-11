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
        <Route path='/createAddress' element={<CreateAddress />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
      <UserHeader />
    </BrowserRouter>
  )
}

export default App
