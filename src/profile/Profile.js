import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Profile extends Component {
  constructor (props) {
    super()

    this.state = {
      groups: []
    }
  }

  componentDidMount (props) {
    axios({
      url: `${apiUrl}/groups`,
      method: 'get'
    })
      .then(response => this.setState({
        groups: response.data.groups
      }))
      .catch(() => console.log('Something went wrong.'))
  }

  render () {
    const { groups } = this.state
    if (!groups.length) {
      return (
        <p>You haven&apos;t created any groups!  Click New Group to change that!</p>
      )
    } else {
      const myGroups = groups.filter(group => group.user_id === this.props.user.id)
      return (
        <React.Fragment>
          <Container className='groups-list'>
            <h2>My Groups:</h2>
            {myGroups.map(group => (
              <Row key={group.id} className='profile-list-item'>
                <Col xs={8} className='p-2'>
                  <h3><Link to={{
                    pathname: '/groups/' + group.id
                  }}>{group.sport.length > 12 ? group.sport.substring(0, 12) + '...' : group.sport}</Link></h3>
                </Col>
              </Row>
            ))}
          </Container>
        </React.Fragment>
      )
    }
  }
}

export default Profile
