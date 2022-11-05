import React from 'react'

export default function NavBar() {
  return (
    <div className='navbar'>
      <div className="navbar__left">
        <img src="/assets/logo.png" alt="Logo" />
        <h1>Lawnmower</h1>
      </div>
      <div className="navbar__center">
        <h1>COMMUNITY </h1>
      </div>
      <div className="navbar__right">
        <img src="/assets/profile.png" alt="" />
      </div>
    </div>
  )
}
