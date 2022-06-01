import React from 'react'
import { useNavigate } from 'react-router'
import { Navbar } from 'react-bootstrap'

function Header() {
  const navigate = useNavigate()

  function signOut() {
    localStorage.removeItem('role')
    localStorage.removeItem('nav')
    navigate('/')
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
      {localStorage.getItem('role') && window.location.href !== "http://localhost:3000/" ? 
        <div style={{ marginLeft: 'auto' }}>
          <Navbar.Text>
            {localStorage.getItem('role')}
          </Navbar.Text>
          <Navbar.Text style={{ marginLeft: "10px", marginRight: "10px" }}>
            <button type="button" className="btn btn-warning" onClick={signOut}>Sign Out</button>
          </Navbar.Text>
        </div> : <></>}
    </Navbar>
  )
}

export default Header