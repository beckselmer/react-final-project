import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const AddUser = ({ onUserAdded }) => {
  // state to track form input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // create a new user object
    const newUser = {
      name,
      email,
    };

    try {
      // make a POST request to mockAPI to add user
      const response = await axios.post('https://65724f62d61ba6fcc014a2d2.mockapi.io/api/v1/users', newUser);

      // log the response or handle it
      console.log('User added successfully:', response.data);

      // this clears the form fields after successful submission
      setName('');
      setEmail('');

      // callback to update the list of users
      onUserAdded(response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <h2>Join</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Button variant="info" type="submit">
          Join
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;
