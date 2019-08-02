import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'

class Groups extends Component {
  constructor () {
    super()

    this.state = {
      groups: []
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/groups`,
      method: 'get'
    })
      .then(response => this.setState({
        groups: response.data.groups
      }))
      .catch(() => console.log('Something went wrong.'))
  }

  render () {
    const { groups } = this.state
    if (!groups.length) {
      return (
        <React.Fragment>
          <p>this.state.groups is empty</p>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <h4>Groups</h4>
          <ul>
            {groups.map(group => (
              <li key={group.id}>
                <h3>{group.sport}</h3>
                <p>Where: {group.city}, {group.state}</p>
                <p>When: {group.date}, {group.time}</p>
              </li>
            ))}
          </ul>
        </React.Fragment>
      )
    }
  }
}
export default Groups
