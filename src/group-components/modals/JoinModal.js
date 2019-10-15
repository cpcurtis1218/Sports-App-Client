import React from 'react'
import { Button, Modal } from 'react-bootstrap'
// import axios from 'axios'
// import apiUrl from '../apiConfig'
// import { withRouter, Redirect } from 'react-router-dom'

const JoinModal = ({ group, show, onHide, handleJoin, handleClose }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Join Group: {group.sport}</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to join {group.sport}?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant='primary' onClick={() => handleJoin(group.id)}>
        Join Group
      </Button>
    </Modal.Footer>
  </Modal>
)

export default JoinModal
