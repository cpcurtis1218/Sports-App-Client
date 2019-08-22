import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { withRouter, Link, Redirect } from 'react-router-dom'

import './Groups.scss'

class Group extends Component {
  constructor (props) {
    super(props)
    const { group } = props.location

    this.state = {
      group: group,
      redirect: false
    }
  }

  handleDelete = id => {
    axios({
      url: `${apiUrl}/groups/${id}`,
      method: 'delete'
    })
      .then(() => this.setState({ redirect: true }))
      .catch(() => console.log('Nope'))
  }

  render () {
    const { group, redirect } = this.state
    if (redirect) {
      return <Redirect to={{
        pathname: '/groups/'
      }}/>
    } else if (!group) {
      return <p>No Group Found!</p>
    }
    const { about, sport, city, state, date, time } = group
    return (
      <Container className='group-component p-2'>
        <Row className='group-header'>
          <Col>
            <h2>{sport}</h2>
            <p className='date'>{date}</p>
            <p>{time}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{about}</p>
            <p>{city}, {state}</p>
          </Col>
        </Row>
        <Row className=''>
          <Col className='button-group'>
            <Button variant='danger' onClick={() => this.handleDelete(group.id)}>Delete</Button>
            <Link to={{
              pathname: '/groups/' + group.id + '/edit',
              group: this.state.group
            }}><Button variant='secondary'>Edit</Button></Link>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(Group)
