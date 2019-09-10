import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'

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
      newId: null
    }
  }

  handleChange = (event) => {
    this.setState({ group: {
      ...this.state.group, [event.target.name]: event.target.value
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

  render () {
    const { group, newId } = this.state
    if (newId) {
      return <Redirect to={{
        pathname: `/groups/${newId}`
      }}/>
    }
    const { sport, city, state, date, time, about } = group
    return (
      <div className="group-form">
        <h2>Create a New Group</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='sport'>Group Name</label>
          <input required={true} value={sport} type='string' name='sport' onChange={this.handleChange}/>
          <label htmlFor='about'>Description</label>
          <textarea value={about} type='string' name='about' onChange={this.handleChange}/>
          <label htmlFor='city'>Location</label>
          <input required={true} value={city} type='string' name='city' placeholder='City' onChange={this.handleChange}/>
          <input required={true} value={state} type='string' name='state' placeholder='State' onChange={this.handleChange}/>
          <label htmlFor='date'>Time</label>
          <div className='time-input'>
            <input required={true} value={date} type='date' name='date' onChange={this.handleChange}/>
            <label htmlFor='time'>at</label>
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
