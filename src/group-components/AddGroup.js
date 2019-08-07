import React, { Component } from 'react'

class AddGroup extends Component {
  constructor () {
    super()

    this.state = {
      group: {
        sport: '',
        city: '',
        state: '',
        date: ''
      }
    }
  }

  handleChange = (event) => {
    this.setState({ group: {
      ...this.state.group, [event.target.name]: event.target.value
    } })
  }

  render () {
    const { sport, city, state, date } = this.state.group
    return (
      <div>
        <h3>Add a new Group</h3>
        <form>
          <h4>Sport:</h4>
          <input required={true} value={sport} type='string' name='sport' onChange={this.handleChange}/>
          <h4>Where:</h4>
          <input required={true} value={city} type='string' name='city' onChange={this.handleChange}/>
          <input required={true} value={state} type='string' name='state' onChange={this.handleChange}/>
          <h4>When:</h4>
          <input required={true} value={date} type='date' name='date' onChange={this.handleChange}/>
        </form>
      </div>
    )
  }
}

export default AddGroup
