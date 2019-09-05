import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Link } from 'react-router-dom'
import PeopleIcon from '../assets/people-icon.png'

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
          <ul className='groups-list container mt-2'>
            {groups.map(group => (
              <li key={group.id} className='group-list-item row'>
                <div className='col-2 p-2'>
                  <p>{group.time}</p>
                </div>
                <div className='col-8 p-2'>
                  <h3><Link to={{
                    pathname: '/groups/' + group.id
                  }}>{group.sport}</Link></h3>
                  <p>{group.city}, {group.state}</p>
                  <p>ID: {group.id}</p>
                </div>
                <div className='col-2 p-2'>
                  <span className='mr-1'>{group.users.length}</span>
                  <img className='people-icon' src={PeopleIcon}/>
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
