import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'

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
    const { user } = this.props

    axios({
      url: `${apiUrl}/groups/${group.id}`,
      method: 'patch',
      headers: {
        Authorization: 'Token token=' + user.token
      },
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
      <div className="group-form">
        <h2>Update Group</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='sport'>Group Name</label>
          <input required={true} value={sport} type='string' name='sport' onChange={this.handleChange}/>
          <label htmlFor='about'>Description</label>
          <textarea value={about} type='string' name='about' onChange={this.handleChange}/>
          <label htmlFor='city'>Location</label>
          <input required={true} value={city} type='string' name='city' onChange={this.handleChange}/>
          <input required={true} value={state} type='string' name='state' onChange={this.handleChange}/>
          <label htmlFor='date'>Time</label>
          <input required={true} value={date} type='date' name='date' onChange={this.handleChange}/>
          <label htmlFor='time'>at</label>
          <input required={true} value={time} type='time' name='time' onChange={this.handleChange}/>
          <br/>
          <Button className="secondary" type='submit'>Submit</Button>
        </form>
      </div>
    )
  }
}

export default withRouter(EditGroup)
