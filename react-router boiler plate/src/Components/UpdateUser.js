import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

// State to track the name and email input values
const UpdateUser = ({ user, show, onHide, onUpdate }) => {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  // Function to handle the update action
  const handleUpdate = async () => {
    if (!user) {
      console.error('User is null');
      return;
    }
    // Create an updated user object
    const updatedUser = {
      id: user.id,
      name,
      email,
    };

    try { // Send a PUT request to the API to update the user
      await axios.put(`https://65724f62d61ba6fcc014a2d2.mockapi.io/api/v1/users/${user.id}`, updatedUser);
      onUpdate(updatedUser); // Call the onUpdate callback to update the list of users
      onHide(); // Hide the update modal
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name || ''} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateUser;
