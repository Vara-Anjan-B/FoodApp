import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Model from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  let data = useCart();
  const [cartView,setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
  <div className="container-fluid">
    <Link Link className="navbar-brand fs-1 fst-italic" to="/">FoodApp</Link>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link Link className="nav-link active fs-5" aria-current="page" to="/"></Link>
        </li>
      </ul>
      {(localStorage.getItem("authToken") === null && localStorage.getItem("authToken") === undefined) ?
        <div className='d-flex'>
          <Link Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
          <Link Link className="btn bg-white text-success mx-1" to="/createuser">Register</Link>
        </div>:
        <div>
          <div className="btn bg-white text-success mx-1" onClick={() => {setCartView(true)}}>
          My Cart
          {data.length !== 0? <div className='d-inline'><button className="btn bg-primary text-white mx-1 rounded-circle w-5 h-5">{data.length}</button></div>:null}
          </div>
          {cartView? <Model onClose={() => {setCartView(false)}}><Cart /></Model>:null}
          <div className="btn bg-danger text-white mx-1" onClick={handleLogOut}>
          LogOut
          </div>
        </div>
      }
    </div>
  </div>
</nav>
    </div>
  )
}
