import React from 'react'
import { Navbar } from 'react-bootstrap'

function Header() {
  function signOut() {
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    window.location.href = '/'
}

  return (
    <Navbar bg="dark" variant="dark">
      <div>
        <Navbar.Brand href="/">
            <img
            alt=""
            src="index.jpeg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            style={ { marginRight: '10px', marginLeft: '10px' } }
            />{' '}
        Leave Management System
        </Navbar.Brand>
      </div>
      {localStorage.getItem('email') && window.location.href !== "http://localhost:3000/" ? 
        <div style={{ marginLeft: 'auto' }}>
          <Navbar.Text>
            {localStorage.getItem('name')} ({localStorage.getItem('role')})
          </Navbar.Text>
          <Navbar.Text style={{ marginLeft: "10px", marginRight: "10px" }}>
            <button type="button" className="btn btn-warning"><a href="#login" onClick={signOut} style={{ textDecoration: "none" }}>Sign Out</a></button>
          </Navbar.Text>
        </div> : <></>}
    </Navbar>
  )
}

export default Header