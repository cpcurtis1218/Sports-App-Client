import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Link } from 'react-router-dom'
import PeopleIcon from '../assets/people-icon.png'
import { Container, Row, Col } from 'react-bootstrap'
import Methods from '../assets/Methods.js'

import './Groups.scss'

class Groups extends Component {
  constructor () {
    super()

    this.state = {
      groups: [],
      searchValue: '',
      searchGroups: []
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

  onSearch = (event) => {
    const groups = this.state.groups
    const value = event.target.value

    const searchGroups = groups.filter(o => o.sport.toLowerCase().includes(value.toLowerCase()))
    this.setState({ searchGroups: searchGroups, searchValue: value })
  }

  render () {
    const { groups, searchValue, searchGroups } = this.state
    if (!groups.length) {
      return (
        <React.Fragment>
          <p className='container mt-2'>There aren&apos;t any groups!</p>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Container className='groups-search'>
            <Row>
              <Col>
                <input placeholder='Search for a Group' onChange={this.onSearch} value={searchValue}/>
              </Col>
            </Row>
          </Container>
          <Container className='groups-list'>
            {(searchGroups.length ? searchGroups : groups).map(group => (
              <Row key={group.id} className='group-list-item'>
                <Col xs={2} className='p-2'>
                  <p>{Methods.timeFormat(group.time)}</p>
                  <p>{Methods.dateFormat(group.date)}</p>
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
