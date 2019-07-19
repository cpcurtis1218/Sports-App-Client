import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { withRouter } from 'react-router-dom'

class Group extends Component {
  constructor () {
    super()

    this.state = {
      group: null
    }
  }

  componentDidMount () {
    const { match } = this.props

    axios({
      url: `${apiUrl}/groups/${match.params.id}`,
      method: 'get'
    })
      .then(response => this.setState({
        group: response.data.group
      }))
      .catch(() => console.log('Something went wrong.'))
  }

  render () {
    const { group } = this.state
    if (!group) {
      return <div>No Group Chosen</div>
    }
    return (
      <div>There is a group in this.state</div>
    )
  }
}

export default withRouter(Group)
