import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Container, Row, Col } from 'react-bootstrap'
import GroupListItem from './GroupListItem'

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

    const searchGroups = groups.filter(o => {
      const val = value.toLowerCase()
      const sport = o.sport.toLowerCase()
      const city = o.city.toLowerCase()
      const state = o.state.toLowerCase()

      return sport.includes(val) || city.includes(val) || state.includes(val)
    })
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
              <GroupListItem key={group.id} group={group}/>
            ))}
          </Container>
        </React.Fragment>
      )
    }
  }
}
export default Groups
