import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'
import GroupMap from '../map/GroupMap.js'

class AddGroup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      group: {
        sport: '',
        city: '',
        state: '',
        date: '',
        time: '',
        about: '',
        user_id: props.user.id
      },
      newId: null,
      searchLocation: {
        city: '',
        state: ''
      }
    }
  }

  handleChange = (event) => {
    this.setState({ group: {
      ...this.state.group, [event.target.name]: event.target.value
    } })
  }

  handleLocationChange = (event) => {
    this.setState({ searchLocation: {
      ...this.state.searchLocation, [event.target.name]: event.target.value
    } })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { group } = this.state
    const { user } = this.props

    group.city = this.state.searchLocation.city
    group.state = this.state.searchLocation.state

    axios({
      url: `${apiUrl}/groups`,
      method: 'post',
      headers: {
        Authorization: 'Token token=' + user.token
      },
      data: { group }
    })
      .then(response => this.setState({
        newId: response.data.group.id
      }))
      .catch(() => {
        console.log('Failed to add group')
        this.setState({
          group: { ...group, sport: '', city: '', state: '', date: '', time: '' }
        })
      })
  }

  handleGeoSubmit = (event) => {
    event.preventDefault()

    console.log('event is', event.target)
  }

  render () {
    const { group, newId, searchLocation } = this.state
    if (newId) {
      return <Redirect to={{
        pathname: `/groups/${newId}`
      }}/>
    }
    const { sport, date, time, about } = group
    return (
      <div className="group-form container">
        <h2>Create a New Group</h2>
        <form>
          <label htmlFor='city'>Location</label>
          <input required={true} value={searchLocation.city} type='string' name='city' placeholder='City' onChange={this.handleLocationChange}/>
          <input required={true} value={searchLocation.state} type='string' name='state' placeholder='State' onChange={this.handleLocationChange}/>
          <div style={{ 'height': '500px', 'width': '500px', 'marginLeft': '10px' }}>
            <GroupMap
              defaultCenter={{ lat: 42.3512354, lng: -71.0584297 }}
              defaultZoom={12}
            >
            </GroupMap>
          </div>
          <Button className="secondary" type='submit'>Submit</Button>
        </form>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='sport'>
            Group Name
            <span>Characters: {sport.length}/50</span>
          </label>
          <input required={true} value={sport} type='string' name='sport' onChange={this.handleChange} maxLength='50'/>
          <label htmlFor='about'>
            Description
            <span>Characters: {about.length}/500</span>
          </label>
          <textarea value={about} type='string' name='about' onChange={this.handleChange} maxLength='500'/>
          <label style={{ 'width': 'auto' }} htmlFor='date'>Time</label>
          <div className='time-input'>
            <input required={true} value={date} type='date' name='date' onChange={this.handleChange}/>
            <label style={{ 'width': 'auto' }} htmlFor='time'>at</label>
            <input required={true} value={time} type='time' name='time' onChange={this.handleChange}/>
          </div>
          <br/>
          <Button className="secondary" type='submit'>Submit</Button>
        </form>
      </div>
    )
  }
}

export default AddGroup
