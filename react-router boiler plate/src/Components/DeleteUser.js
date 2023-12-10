import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

// Function to handle the delete action
const DeleteUser = ({ user, show, onHide, onDelete }) => {
  const handleDelete = async () => {
    if (!user) {
      console.error('User is null');
      return;
    }

    try { // Send a DELETE request to the API to delete the user
      await axios.delete(`https://65724f62d61ba6fcc014a2d2.mockapi.io/api/v1/users/${user.id}`);
      onDelete(user); // Call the onDelete callback to update the user list
      onHide(); // Hide the delete modal
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {user ? user.name : 'this user'}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUser;
