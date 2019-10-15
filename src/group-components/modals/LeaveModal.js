import React from 'react'
import { Button, Modal } from 'react-bootstrap'
// import axios from 'axios'
// import apiUrl from '../apiConfig'
// import { withRouter, Redirect } from 'react-router-dom'

const JoinModal = ({ group, show, onHide, handleLeave, handleClose }) => (
  <Modal show={show} onHide={this.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Leave Group: {group.sport}</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to leave {group.sport}?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant='danger' onClick={() => handleLeave(group.id)}>
        Leave Group
      </Button>
    </Modal.Footer>
  </Modal>
)

export default JoinModal
