import React, { Component } from 'react'
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
      <div className="group-component">
        <h2>{sport}</h2>
        <p>{about}</p>
        <p>Where: {city}, {state}</p>
        <p>When: {date}, {time}</p>
        <button onClick={() => this.handleDelete(group.id)}>Delete</button>
        <Link to={{
          pathname: '/groups/' + group.id + '/edit',
          group: this.state.group
        }}><button>Edit</button></Link>
      </div>
    )
  }
}

export default withRouter(Group)
