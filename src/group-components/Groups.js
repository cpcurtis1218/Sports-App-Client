import React, { Component } from 'react'

class Groups extends Component {
  constructor () {
    super()

    this.state = {
      groups: []
    }
  }

  render () {
    const { groups } = this.state
    if (!groups.length) {
      return (
        <React.Fragment>
          <p>this.state.groups is empty</p>
        </React.Fragment>
      )
    } else {
      return (
        <p>this.state.groups is populated!</p>
      )
    }
  }
}
export default Groups
