import React, { Component } from 'react';
import UserList from '../components/UserList';
import axios from 'axios';

const url = 'https://mern-brothers.herokuapp.com/users'

export default class UserPage extends Component {
  state = {
    data: [],
    totalDocs: null,
    totalPages: null,
    nextPage: 0,
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.nextPage !== prevState.nextPage) {
      this.fetchData();
    }
  }
  componentWillUpdate(nextProps) {
    if (this.props.editedMessage.id !== nextProps.editedMessage.id) {
      this.fetchData();
    }
  }


  fetchData = () => {
    axios.get(`${url}?page=${this.state.nextPage}`)
      .then(result => this.setState({
        data: result.data.docs,
        totalDocs: result.data.totalDocs,
        totalPages: result.data.totalPages
      }))
      .catch(err => err)
  }

  changePage = (page) => {
    this.setState({ nextPage: page })
  }

  deleteUser = async (id) => {
    axios.put(`${url}/${id}`, { is_deleted: true })
      .then(result => Object.assign({}, result.data, { id }))
      .then(data => console.log("Was Deleted...", data))
  }

  render() {

    return (
      <div>
        <UserList {...this.state} fetchData={this.fetchData} changePage={this.changePage} deleteUser={this.deleteUser} willEditUser={this.props.willEditUser} />
      </div>
    )
  }
}


// {
//   "roles": [
//       {
//           "_id": "605cc7b93c5e034bbc625e52"
//       }
//   ],
//   "firstname": "degisti",
//   "lastname": "degisti",
//   "email": "degisti@test.com",
//   "username": "degisti",
//   "company": "degisticompany",
//   "phone": null,
//   "is_deleted": false
// }


// admin 605cc7b93c5e034bbc625e54
// user 605cc7b93c5e034bbc625e52
// mode 605cc7b93c5e034bbc625e53