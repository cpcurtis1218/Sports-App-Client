import React, { Fragment } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
// import axios from 'axios'
// import apiUrl from '../apiConfig'
import { Link } from 'react-router-dom'
import PeopleIcon from '../assets/people-icon.png'
import Methods from '../assets/Methods.js'

import './Groups.scss'

const GroupItem = ({ group, user, isMember, handleShowJoin, handleShowLeave, handleDelete }) => {
  let buttonGroup

  if (!user) {
    buttonGroup = <p>Please Sign In to Join Group!</p>
  } else if (user.id === group.user_id) {
    buttonGroup = (
      <React.Fragment>
        <Button variant='danger' onClick={() => handleDelete(group.id)}>Delete</Button>
        <Link to={{
          pathname: '/groups/' + group.id + '/edit',
          group: group
        }}><Button variant='secondary'>Edit</Button></Link>
      </React.Fragment>
    )
  } else if (isMember) {
    buttonGroup = <Button variant='danger' onClick={handleShowLeave}>Leave</Button>
  } else {
    buttonGroup = <Button variant='secondary' onClick={handleShowJoin}>Join</Button>
  }

  return (
    <Fragment>
      <Row className='group-header'>
        <Col xs={9}>
          <p className='date'>{Methods.dateFormat(group.date)}</p>
          <h2>{group.sport}</h2>
          <p>{group.city}, {group.state}</p>
          <p>{Methods.timeFormat(group.time)}</p>
        </Col>
        <Col xs={3} className=''>
          <span className='mr-1'>{group.memberships.length}</span>
          <img className='people-icon' src={PeopleIcon}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{group.about}</p>
        </Col>
      </Row>
      <Row className=''>
        <Col>
          <p>Owner: {group.user_id}</p>
        </Col>
        <Col className='button-group'>
          {buttonGroup}
        </Col>
      </Row>
    </Fragment>
  )
}

export default GroupItem
