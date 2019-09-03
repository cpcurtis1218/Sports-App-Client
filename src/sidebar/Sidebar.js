import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Sidebar.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Col className='text-center'><Link to={'/'}>Explore</Link></Col>
    <Col className='text-center'><Link to={'/groups'}>Groups</Link></Col>
    <Col className='text-center'><Link to={'/add-group'}>New Group</Link></Col>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Col className='text-center'><Link to={'/'}>Explore</Link></Col>
    <Col className='text-center'><Link to={'/groups'}>Groups</Link></Col>
    <Col className='text-center'></Col>
  </React.Fragment>
)

const Sidebar = ({ user }) => (
  <Container className='sidebar'>
    <Row>
      {user ? authenticatedOptions : unauthenticatedOptions}
    </Row>
  </Container>
)

export default Sidebar
