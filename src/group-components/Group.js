import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { withRouter } from 'react-router-dom'

class Group extends Component {
  constructor () {
    super()

    this.state = {
      group: null
    }
  }

  componentDidMount () {
    const { match } = this.props

    axios({
      url: `${apiUrl}/groups/${match.params.id}`,
      method: 'get'
    })
      .then(response => this.setState({
        group: response.data.group
      }))
      .catch(() => console.log('Something went wrong.'))
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
        </div>
      )
    }
  }
}

export default withRouter(Group)
