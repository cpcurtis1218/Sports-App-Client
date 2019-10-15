import React, { Component } from 'react'
import { Container, Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { withRouter, Redirect } from 'react-router-dom'
import GroupItem from './GroupItem'

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
      .then(() => this.handleClose())
      .then(() => console.log('Leave Success!'))
      .catch(() => console.log('Leave Failed'))
  }

  handleClose = () => this.setState({ showJoin: false, showLeave: false })

  handleShowJoin = () => this.setState({ showJoin: true })
  handleShowLeave = () => this.setState({ showLeave: true })

  render () {
    const { group, redirect, loading, isMember, showJoin, showLeave } = this.state

    if (loading) {
      return <p>No Group Found!</p>
    }

    if (redirect) {
      return <Redirect to={{
        pathname: '/groups/'
      }}/>
    } else {
      const { sport } = group
      return (
        <Container className='group-component'>
          <GroupItem
            group={group}
            user={this.props.user}
            isMember={isMember}
            handleShowJoin={this.handleShowJoin}
            handleShowLeave={this.handleShowLeave}
            handleDelete={this.handleDelete}
          />
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
          <Modal show={showLeave} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Leave Group: {sport}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to leave {sport}?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant='danger' onClick={() => this.handleLeave(group.id)}>
                Leave Group
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )
    }
  }
}

export default withRouter(Group)
