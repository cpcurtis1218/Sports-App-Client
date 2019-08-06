import React, { Component } from 'react'

class AddGroup extends Component {
  constructor () {
    super()

    this.state = {
      group: {
        sport: ''
      }
    }
  }

  handleChange = (event) => {
    this.setState({ group: {
      ...this.state.group, [event.target.name]: event.target.value
    } })
  }

  render () {
    const { sport } = this.state.group
    return (
      <div>
        <h3>Add a new Group</h3>
        <form>
          <h4>Sport:</h4><input required={true} value={sport} type='string' name='sport' onChange={this.handleChange}/>
          <p>Where:</p>
          <p>When:</p>
        </form>
      </div>
    )
  }
}

export default AddGroup
