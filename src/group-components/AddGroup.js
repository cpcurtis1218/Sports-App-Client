import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'
import MapContainer from '../map/MapContainer.js'
import './Groups.scss'

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
        address: ''
      },
      map: {
        center: {
          lat: null,
          lng: null
        }
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
    const searchLocation = this.state.searchLocation

    const geocoder = new window.google.maps.Geocoder()

    geocoder.geocode({ 'address': searchLocation.address }, function (results, status) {
      if (status === 'OK') {
        console.log('results is ', results)
        // update searchLocation to match response from maps API
        const searchLocation = this.state.searchLocation
        searchLocation.address = results[0].formatted_address
        this.setState({
          searchLocation: searchLocation
        })

        // update group city and state fields
        const group = this.state.group
        group.city = results[0].formatted_address.split(', ')[0]
        group.state = results[0].formatted_address.match(/[A-Z][A-Z]/)[0]
        this.setState({
          group: group
        })

        const center = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }
        this.setState({
          map: {
            center: center
          }
        })
      } else {
        alert('Geocode was not successful for the following reason: ' + status)
      }
    }.bind(this))
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
        <form onSubmit={this.handleGeoSubmit}>
          <label htmlFor='city'>Location</label>
          <input required={true} value={searchLocation.address} type='string' name='address' placeholder='City, State (ex: Boston, MA)' onChange={this.handleLocationChange}/>
          <Button className="secondary" type='submit'>Submit</Button>
        </form>
        <div className='map-div'>
          <MapContainer
            center={this.state.map.center}
            style={{
              width: '500px',
              height: '500px'
            }}
          >
          </MapContainer>
        </div>
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
