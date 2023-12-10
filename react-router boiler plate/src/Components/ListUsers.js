import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Button } from 'react-bootstrap';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import UpdateUser from './UpdateUser';

// State hooks for managing users, delete modal visibility, update modal visibility, and selected user
function ListUsers() {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch the data from MockAPI
    axios.get('https://65724f62d61ba6fcc014a2d2.mockapi.io/api/v1/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty array runs the effect one time
  // Triggered when the Delete button is clicked on a user
  const handleDeleteClick = (user) => {
    setSelectedUser(user); // Set the selected user for deletion
    setShowDeleteModal(true); // Show the delete modal
  };
  // Triggered when the Update button is clicked on a user
  const handleUpdateClick = (user) => {
    setSelectedUser(user); // Set the selected user for updating
    setShowUpdateModal(true); // Show the update modal
  };
  // Handle the deletion of a user
  const handleDeleteUser = (deletedUser) => { // Remove the deleted user from the list of users
    setUsers(prevUsers => prevUsers.filter(user => user.id !== deletedUser.id));
  };
  // Handle the update of a user
  const handleUpdateUser = (updatedUser) => { // Update the user in the list of users
    setUsers(prevUsers => prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  return (
    <div>
      <h2>Users</h2>
      <ListGroup>
        {users.map(user => (
          <ListGroup.Item key={user.id} className="list-item-container">
            <div className="email-column">
              <strong>Name:</strong> {user.name} | <strong>Email:</strong> {user.email}
            </div>
            <div>
              <Button variant="danger" className="ml-2" onClick={() => handleDeleteClick(user)}>
                Delete
              </Button>
              <Button variant="warning" className="ml-2" onClick={() => handleUpdateClick(user)}>
                Update
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <AddUser onUserAdded={(newUser) => setUsers(prevUsers => [...prevUsers, newUser])} />
      <DeleteUser
        user={selectedUser}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onDelete={handleDeleteUser}
      />
      <UpdateUser
        user={selectedUser}
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
}

export default ListUsers;