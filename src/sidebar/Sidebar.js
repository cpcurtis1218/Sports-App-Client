import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Sidebar.scss'

class Sidebar extends Component {
  render () {
    return (
      <Container className='sidebar'>
        <Row>
          <Col className='text-center'><Link to={'/'}>Explore</Link></Col>
          <Col className='text-center'><Link to={'/groups'}>Groups</Link></Col>
          <Col className='text-center'><Link to={'/add-group'}>New Group</Link></Col>
        </Row>
      </Container>
    )
  }
}

export default Sidebar
