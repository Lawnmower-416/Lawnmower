import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='navbar'>
      <div className="navbar__left">
        <img className='chat__logo' src="/assets/logo.png" alt="Logo" />
        <Link to={'/'}><h1>Lawnmower</h1></Link>
      </div>
      <div className="navbar__center">
        <h1>COMMUNITY </h1>
      </div>
      <div className="navbar__right">
        <img className='chat__profile_img' src="/assets/profile.png" alt="" />
      </div>
    </div>
  )
}
