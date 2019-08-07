import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'

class AddGroup extends Component {
  constructor () {
    super()

    this.state = {
      group: {
        sport: '',
        city: '',
        state: '',
        date: '',
        time: ''
      }
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

    axios({
      url: `${apiUrl}/groups`,
      method: 'post',
      data: { group }
    })
      .then(() => console.log('New Group Added!'))
      .catch(() => {
        console.log('Failed to add group')
        this.setState({
          group: { ...group, sport: '', city: '', state: '', date: '', time: '' }
        })
      })
  }

  render () {
    const { sport, city, state, date, time } = this.state.group
    return (
      <div>
        <h3>Add a new Group</h3>
        <form onSubmit={this.handleSubmit}>
          <h4>Sport:</h4>
          <input required={true} value={sport} type='string' name='sport' onChange={this.handleChange}/>
          <h4>Where:</h4>
          <input required={true} value={city} type='string' name='city' onChange={this.handleChange}/>
          <input required={true} value={state} type='string' name='state' onChange={this.handleChange}/>
          <h4>When:</h4>
          <input required={true} value={date} type='date' name='date' onChange={this.handleChange}/>
          <p>at</p>
          <input required={true} value={time} type='time' name='time' onChange={this.handleChange}/>
          <br/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default AddGroup
