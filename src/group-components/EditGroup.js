import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'

class EditGroup extends Component {
  constructor (props) {
    super(props)
    const { group } = props.location

    this.state = {
      group: group,
      redirect: false
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
      url: `${apiUrl}/groups/${group.id}`,
      method: 'patch',
      data: { group }
    })
      .then(() => console.log('Edit Successful!'))
      .then(() => this.setState({
        redirect: true
      }))
      .catch(() => {
        console.log('Failed to add group')
        this.setState({
          group: { ...group, sport: '', city: '', state: '', date: '', time: '', about: '' }
        })
      })
  }

  render () {
    const { group, redirect } = this.state
    if (!group) {
      return <p>No Group to Edit!</p>
    } else if (redirect) {
      return <Redirect to={{
        pathname: `/groups/${group.id}`,
        group: group
      }}/>
    }
    const { about, sport, city, state, date, time } = group
    return (
      <div>
        <h2>Edit Group</h2>
        <form onSubmit={this.handleSubmit}>
          <h4>Sport:</h4>
          <input required={true} value={sport} type='string' name='sport' onChange={this.handleChange}/>
          <h4>About:</h4>
          <textarea value={about} type='string' name='about' onChange={this.handleChange}/>
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

export default withRouter(EditGroup)
