import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { withRouter, Link } from 'react-router-dom'

class Group extends Component {
  constructor (props) {
    super(props)
    const { group } = props.location

    this.state = {
      group
    }
  }

  handleDelete = id => {
    axios({
      url: `${apiUrl}/groups/${id}`,
      method: 'delete'
    })
      .then(() => console.log('Group Deleted!'))
      .catch(() => console.log('Nope'))
  }

  render () {
    const { group } = this.state
    if (!group) {
      return <div>No Group Chosen</div>
    } else {
      const { sport, city, state, date, time } = this.state.group
      return (
        <div className="group-card">
          <h3>{sport}</h3>
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
}

export default withRouter(Group)
