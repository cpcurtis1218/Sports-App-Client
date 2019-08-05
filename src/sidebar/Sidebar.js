import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

import './Sidebar.scss'

class Sidebar extends Component {
  render () {
    return (
      <div className='sidebar container'>
        <div className='row'>
          <p>View All Groups</p>
          <p>Add a Group</p>
          <p>Edit a Group</p>
          <p>Delete a Group</p>
        </div>
      </div>
    )
  }
}

export default Sidebar
