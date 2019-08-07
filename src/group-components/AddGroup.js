import React, { Component } from 'react'

class AddGroup extends Component {
  constructor () {
    super()

    this.state = {
      group: {
        sport: '',
        city: ''
      }
    }
  }

  handleChange = (event) => {
    this.setState({ group: {
      ...this.state.group, [event.target.name]: event.target.value
    } })
  }

  render () {
    const { sport, city } = this.state.group
    return (
      <div>
        <h3>Add a new Group</h3>
        <form>
          <h4>Sport:</h4>
          <input required={true} value={sport} type='string' name='sport' onChange={this.handleChange}/>
          <h4>Where:</h4>
          <input required={true} value={city} type='string' name='city' onChange={this.handleChange}/>
          <h4>When:</h4>
        </form>
      </div>
    )
  }
}

export default AddGroup
