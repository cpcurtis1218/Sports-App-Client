import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

import './Sidebar.scss'

class Sidebar extends Component {
  render () {
    return (
      <div className='sidebar'>
        <h5>View All Groups</h5>
        <h5>Add a Group</h5>
        <h5>Edit a Group</h5>
        <h5>Delete a Group</h5>
      </div>
    )
  }
}

export default Sidebar
