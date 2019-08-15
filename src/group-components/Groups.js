import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Link } from 'react-router-dom'

import './Groups.scss'

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
          <h2>Groups</h2>
          <ul className='groups-list'>
            {groups.map(group => (
              <li key={group.id} className="group-list-item">
                <h3><Link to={{
                  pathname: '/groups/' + group.id,
                  group: group
                }}>{group.sport}</Link></h3>
                <p>Where: {group.city}, {group.state}</p>
                <p>When: {group.date}, {group.time}</p>
                <p>ID: {group.id}</p>
              </li>
            ))}
          </ul>
        </React.Fragment>
      )
    }
  }
}
export default Groups
