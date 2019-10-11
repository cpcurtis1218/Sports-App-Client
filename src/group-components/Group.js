import React, { Component } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { withRouter, Link, Redirect } from 'react-router-dom'
import PeopleIcon from '../assets/people-icon.png'
import Methods from '../assets/Methods.js'

import './Groups.scss'

class Group extends Component {
  constructor () {
    super()

    this.state = {
      group: null,
      redirect: false,
      loading: true,
      isMember: false,
      showJoin: false,
      showLeave: false
    }
  }

  componentDidMount () {
    const { match, user } = this.props

    axios({
      url: `${apiUrl}/groups/${match.params.id}`,
      method: 'get'
    })
      .then(response => this.setState({
        group: response.data.group,
        loading: false,
        isMember: user ? response.data.group.memberships.some(obj => obj.user_id === user.id) : false
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
      .then((response) => {
        const group = this.state.group
        group.memberships.push(response.data.membership)

        // set isMember to true, update the group to the new group
        return this.setState({ isMember: true, group: group })
      })
      .then(() => this.handleClose())
      .then(() => console.log('Join Success!'))
      .catch(() => console.log('Join Failed'))
  }

  handleLeave = (groupId) => {
    const user = this.props.user
    const group = this.state.group
    const membership = group.memberships.find((obj) => obj.user_id === user.id)

    axios({
      url: `${apiUrl}/memberships/${membership.id}`,
      method: 'delete',
      headers: {
        Authorization: 'Token token=' + user.token
      }
    })
      .then(() => {
        const memIndex = group.memberships.indexOf(membership)
        group.memberships.splice(memIndex, 1)

        // set isMember to true, update the group to the new group
        return this.setState({ isMember: false, group: group })
      })
      .then(() => console.log('Leave Success!'))
      .catch(() => console.log('Leave Failed'))
  }

  handleClose = () => this.setState({ showJoin: false, showLeave: false })
  handleShowJoin = () => this.setState({ showJoin: true })

  render () {
    const { group, redirect, loading, isMember, showJoin } = this.state
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
    } else if (isMember) {
      buttonGroup = <Button variant='danger' onClick={() => this.handleLeave(group.id)}>Leave</Button>
    } else {
      buttonGroup = <Button variant='secondary' onClick={this.handleShowJoin}>Join</Button>
    }

    if (redirect) {
      return <Redirect to={{
        pathname: '/groups/'
      }}/>
    } else {
      const { about, sport, city, state, date, time, memberships } = group
      const ownerId = group.user_id
      return (
        <Container className='group-component'>
          <Row className='group-header'>
            <Col xs={9}>
              <p className='date'>{Methods.dateFormat(date)}</p>
              <h2>{sport}</h2>
              <p>{city}, {state}</p>
              <p>{Methods.timeFormat(time)}</p>
            </Col>
            <Col xs={3} className=''>
              <span className='mr-1'>{memberships.length}</span>
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
          <Modal show={showJoin} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Join Group: {sport}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to join {sport}?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant='primary' onClick={() => this.handleJoin(group.id)}>
                Join Group
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )
    }
  }
}

export default withRouter(Group)
