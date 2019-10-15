import React from 'react'
import { Link } from 'react-router-dom'
import PeopleIcon from '../assets/people-icon.png'
import { Row, Col } from 'react-bootstrap'
import Methods from '../assets/Methods.js'

import './Groups.scss'

const GroupListItem = ({ group }) => (
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
)

export default GroupListItem
