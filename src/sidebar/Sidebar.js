import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Sidebar.scss'

class Sidebar extends Component {
  render () {
    return (
      <Container className='sidebar'>
        <Row>
          <Col><Link to={'/groups'}>View All Groups</Link></Col>
          <Col>Add a Group</Col>
          <Col>Edit a Group</Col>
          <Col>Delete a Group</Col>
        </Row>
      </Container>
    )
  }
}

export default Sidebar
