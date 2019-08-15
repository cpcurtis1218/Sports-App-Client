import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Sidebar.scss'

class Sidebar extends Component {
  render () {
    return (
      <Container className='sidebar'>
        <Row>
          <Col className='text-center p-0'><Link to={'/'}>Home</Link></Col>
          <Col className='text-center p-0'><Link to={'/groups'}>All Groups</Link></Col>
          <Col className='text-center p-0'><Link to={'/add-group'}>New Group</Link></Col>
        </Row>
      </Container>
    )
  }
}

export default Sidebar
