import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { withRouter, Link, Redirect } from 'react-router-dom'
import PeopleIcon from '../assets/people-icon.png'

import './Groups.scss'

class Group extends Component {
  constructor () {
    super()

    this.state = {
      group: null,
      redirect: false,
      loading: true
    }
  }

  componentDidMount () {
    const { match } = this.props

    axios({
      url: `${apiUrl}/groups/${match.params.id}`,
      method: 'get'
    })
      .then(response => this.setState({
        group: response.data.group,
        loading: false
      }))
      .catch(() => console.log('Something Went Wrong'))
  }

  handleDelete = id => {
    const { user } = this.props
    axios({
      url: `${apiUrl}/groups/${id}`,
      method: 'delete',
      headers: {
        Authorization: 'Token token=' + user.token
      }
    })
      .then(() => this.setState({ redirect: true }))
      .catch(() => console.log('Nope'))
  }

  handleJoin = (groupId) => {
    const { user } = this.props
    axios({
      url: `${apiUrl}/memberships/`,
      method: 'post',
      headers: {
        Authorization: 'Token token=' + user.token
      },
      data: {
        membership: {
          group_id: groupId
        }
      }
    })
      .then(() => console.log('Join Success!'))
      .catch(() => console.log('Join Failed'))
  }

  render () {
    const { group, redirect, loading } = this.state
    let buttonGroup

    if (loading) {
      return <p>No Group Found!</p>
    }

    if (!this.props.user) {
      buttonGroup = <p>Please Sign In to Join Group!</p>
    } else if (this.props.user.id === group.user_id) {
      buttonGroup = (
        <React.Fragment>
          <Button variant='danger' onClick={() => this.handleDelete(group.id)}>Delete</Button>
          <Link to={{
            pathname: '/groups/' + group.id + '/edit',
            group: this.state.group
          }}><Button variant='secondary'>Edit</Button></Link>
        </React.Fragment>
      )
    } else {
      buttonGroup = <Button variant='secondary' onClick={() => this.handleJoin(group.id)}>Join</Button>
    }

    if (redirect) {
      return <Redirect to={{
        pathname: '/groups/'
      }}/>
    } else {
      const { about, sport, city, state, date, time } = group
      const ownerId = group.user_id
      return (
        <Container className='group-component p-2'>
          <Row className='group-header'>
            <Col xs={9}>
              <p className='date'>{date}</p>
              <h2>{sport}</h2>
              <p>{city}, {state}</p>
              <p>{time}</p>
            </Col>
            <Col xs={3} className='justify-content-center'>
              <span className='mr-1'>4</span>
              <img className='people-icon' src={PeopleIcon}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{about}</p>
            </Col>
          </Row>
          <Row className=''>
            <Col>
              <p>Owner: {ownerId}</p>
            </Col>
            <Col className='button-group'>
              {buttonGroup}
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default withRouter(Group)
