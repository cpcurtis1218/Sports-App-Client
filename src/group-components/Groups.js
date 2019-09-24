import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Link } from 'react-router-dom'
import PeopleIcon from '../assets/people-icon.png'
import { Container, Row, Col } from 'react-bootstrap'

import './Groups.scss'

class Groups extends Component {
  constructor () {
    super()

    this.state = {
      groups: []
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/groups`,
      method: 'get'
    })
      .then(response => this.setState({
        groups: response.data.groups
      }))
      .catch(() => console.log('Something went wrong.'))
  }

  dateFormat (date) {
    const dateArr = date.split('-')
    return `${dateArr[1]}/${dateArr[2]}/${dateArr[0][2]}${dateArr[0][3]}`
  }

  timeFormat (time) {
    const timeArr = time.split(':')
    // if the hours are less than 10 (single digit), use the digit and minutes
    if (timeArr[0] < 10) {
      return timeArr[0][1] + ':' + timeArr[1] + 'AM'
    // if the hours are less than 12, just use the time + AM
    } else if (timeArr[0] < 12) {
      return time + 'AM'
    // else just subtract 12 from the hours and add PM
    } else {
      return timeArr[0] - 12 + ':' + timeArr[1] + 'PM'
    }
  }

  render () {
    const { groups } = this.state
    if (!groups.length) {
      return (
        <React.Fragment>
          <p className='container mt-2'>There aren&apos;t any groups!</p>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Container className='groups-list'>
            {groups.map(group => (
              <Row key={group.id} className='group-list-item'>
                <Col xs={2} className='p-2'>
                  <p>{this.timeFormat(group.time)}</p>
                  <p>{this.dateFormat(group.date)}</p>
                </Col>
                <Col xs={8} className='p-2'>
                  <h3><Link to={{
                    pathname: '/groups/' + group.id
                  }}>{group.sport}</Link></h3>
                  <p>{group.city}, {group.state}</p>
                </Col>
                <Col xs={2} className='p-2'>
                  <span className='mr-1'>{group.memberships.length}</span>
                  <img className='people-icon' src={PeopleIcon}/>
                </Col>
              </Row>
            ))}
          </Container>
        </React.Fragment>
      )
    }
  }
}
export default Groups
