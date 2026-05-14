import React, { useState, useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {
    const[menu, setMenu] = useState("home");
    const {getTotalCartAmount, token, setToken, search, setSearch, setCartItems, userName, setUserName} = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("cartItems"); // clear cart from local storage
      localStorage.removeItem("userName");
      setToken("");
      setUserName("");
      setCartItems({}); // reset cart in context
      navigate("/");
    }

  return (
    <div className='navbar'>
      
      <Link to="/">
        <h1 className="logo">CraveIt.</h1>
      </Link>

      <ul className="navbar-menu">
  <Link to="/" onClick={() => setMenu("home")} className={menu==="home" ? "active" : ""}>Home</Link>

  <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu==="menu" ? "active" : ""}>Menu</a>

  <a href='#footer' onClick={() => setMenu("contact-us")} className={menu==="contact-us" ? "active" : ""}>Contact Us</a>
</ul>


      <div className="navbar-right">
        <div className="navbar-search">
          <input 
            type="text" 
            placeholder="Search food..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate('/');
                setTimeout(() => document.getElementById("food-display")?.scrollIntoView({ behavior: "smooth" }), 100);
              }
            }}
          />
          <img src={assets.search_icon} alt="" style={{cursor: 'pointer'}} onClick={() => {
              navigate('/');
              setTimeout(() => document.getElementById("food-display")?.scrollIntoView({ behavior: "smooth" }), 100);
          }} />
        </div>

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>

        {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button>
        : <div className='navbar-profile'>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{cursor: 'pointer'}}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <ul className="nav-profile-dropdown">
              <li style={{cursor: 'default', color: 'var(--primary-color)', fontWeight: 'bold', justifyContent: 'center'}}>
                <p>Hello, {userName || "User"}</p>
              </li>
              <hr />
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }
      </div>

    </div>
  )
}

export default Navbar