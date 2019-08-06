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

  render () {
    const { sport } = this.state.group
    return (
      <div>
        <h3>Add a new Group</h3>
        <form>
          <h4>Sport:</h4><input required={true} value={sport} type='string' name='sport'/>
          <p>Where:</p>
          <p>When:</p>
        </form>
      </div>
    )
  }
}

export default AddGroup
