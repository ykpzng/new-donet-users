import React, { useState } from 'react';
import './App.css';
import { Route } from "react-router-dom";
import UserPage from './pages/UserPage';
import EditUserPage from './pages/EditUserPage';
import axios from 'axios';

const url = 'https://mern-brothers.herokuapp.com/users'

const App = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [editedMessage, setEditedMessage] = useState({})
  const willEditUser = (id) => {
    axios.get(`${url}/info/${id}`)
      .then(result => result.data)
      .then(data => setCurrentUser(data))
      .catch(err => err)
  }

  const editUser = (id, roles, firstname, lastname, email, username, company, phone) => {
    axios.put(`${url}/${id}`, { roles, firstname, lastname, email, username, company, phone, is_deleted: false })
      .then(result => Object.assign({}, result.data, { id }))
      .then(id => setEditedMessage(id))
      .catch(err => console.log(err))
  }

  console.log(editedMessage)
  return (
    <div className="App">
      <Route exact path="/users"> <UserPage willEditUser={willEditUser} editedMessage={editedMessage} /> </Route>
      <Route exact path="/user/edit/:id"><EditUserPage currentUser={currentUser} editUser={editUser} /> </Route>
    </div>
  );
}

export default App;
