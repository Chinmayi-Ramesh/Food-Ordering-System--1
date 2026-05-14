import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'



const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <h1 style={{ color: 'var(--primary-color)', fontSize: '36px', fontWeight: 'bold' }}>CraveIt.</h1>
          <p>Where the grid meets the gourmet.</p>
          <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className='footer-content-center'>
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>

        </div>
        <div className='footer-content-right'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 12345-67890</li>
            <li>contact@craveit.com</li>

          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2026 © CraveIt.com All rights Reserved.</p>
    </div>
  )
}

export default Footer