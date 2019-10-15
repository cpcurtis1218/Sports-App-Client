import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { withRouter, Redirect } from 'react-router-dom'
import GroupItem from './GroupItem'
import JoinModal from './modals/JoinModal'
import LeaveModal from './modals/LeaveModal'

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

  handleDelete = groupId => {
    const { user } = this.props
    axios({
      url: `${apiUrl}/groups/${groupId}`,
      method: 'delete',
      headers: {
        Authorization: 'Token token=' + user.token
      }
    })
      .then(() => this.setState({ redirect: true }))
      .catch(() => console.log('Nope'))
  }

  handleJoin = groupId => {
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

  handleLeave = () => {
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

  // Modal methods
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
          <JoinModal
            group={group}
            show={showJoin}
            onHide={this.handleClose}
            handleJoin={this.handleJoin}
            handleClose={this.handleClose}
          />
          <LeaveModal
            group={group}
            show={showLeave}
            onHide={this.handleClose}
            handleLeave={this.handleLeave}
            handleClose={this.handleClose}
          />
        </Container>
      )
    }
  }
}

export default withRouter(Group)
