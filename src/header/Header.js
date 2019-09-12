import React from 'react'
// import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Nav.Link href="#/profile">Profile</Nav.Link>
    <Nav.Link href="#/change-password">Change Password</Nav.Link>
    <Nav.Link href="#/sign-out">Sign Out</Nav.Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Nav.Link href="#/sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#/sign-in">Sign In</Nav.Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <Navbar sticky="top" expand="lg" variant="light">
    <h1>LetsGo</h1>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
      <Nav className="text-right">
        { user && <Nav.Item className="p-2 text-right">Welcome, {user.email}</Nav.Item>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
