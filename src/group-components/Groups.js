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
          <ul className='groups-list container'>
            {groups.map(group => (
              <li key={group.id} className='group-list-item row my-2'>
                <div className='col-2 p-2'>
                  <p>{group.time}</p>
                </div>
                <div className='col-10 p-2'>
                  <h3><Link to={{
                    pathname: '/groups/' + group.id,
                    group: group
                  }}>{group.sport}</Link></h3>
                  <p>{group.city}, {group.state}</p>
                  <p>ID: {group.id}</p>
                </div>
              </li>
            ))}
          </ul>
        </React.Fragment>
      )
    }
  }
}
export default Groups
