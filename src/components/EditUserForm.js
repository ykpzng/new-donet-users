import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

const url = 'https://mern-brothers.herokuapp.com/users';

export default class EditUserForm extends Component {
  state = { redirect: false }

  componentDidUpdate(prevProps) {
    // Genel kullanım (prop değerlerini karşılaştırmayı unutmayınız!):
    if (this.props.willEditData !== prevProps.willEditData) {
      this.setState({
        id: this.props.willEditData.id,
        firstname: this.props.willEditData.firstname,
        lastname: this.props.willEditData.lastname,
        username: this.props.willEditData.username,
        role: this.props.willEditData.roles[0].name,
        email: this.props.willEditData.email,
        is_deleted: this.props.willEditData.is_deleted.toString(),
        company: this.props.willEditData.company,
        phone: this.props.willEditData.phone,
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { id, firstname, lastname, username, role, email, company, phone } = this.state;

    let roles = role === "user" ? [{ "_id": "605cc7b93c5e034bbc625e52" }] : role === "moderator" ? "605cc7b93c5e034bbc625e53" : [{ "_id": "605cc7b93c5e034bbc625e54" }];

    this.props.editUser(id, roles, firstname, lastname, email, username, company, phone);
    this.setState({ redirect: true });
  }


  render() {
    console.log(this.props.willEditData)
    console.log()

    const formContent = (
      <div className="container-fluid">
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputFirstname">First Name</label>
              <input type="text" className="form-control"
                id="inputFirstname"
                placeholder="First Name"
                name="firstname"
                onChange={this.handleChange}
                value={this.state.firstname}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputLastname">Last Name</label>
              <input type="text" className="form-control"
                id="inputLastname"
                placeholder="Last Name"
                name="lastname"
                onChange={this.handleChange}
                value={this.state.lastname}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="inputusername">User Name</label>
              <input type="text" className="form-control"
                id="inputusername"
                placeholder="User Name"
                name="username"
                onChange={this.handleChange}
                value={this.state.username} />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="selectrole">Role</label>
              <select id="selectrole" className="form-control"
                name="role"
                onChange={this.handleChange}
                defaultValue={this.state.role}>
                <option selected>{this.state.role}</option>
                <option value="user">user</option>
                <option value="moderator">moderator</option>
                <option value="admin">admin</option>
              </select>
            </div>
            {/* deleted */}
          </div>
          <div className="form-row">
            <div className="form-group col-md-8">
              <label htmlFor="inputCompany">Company</label>
              <input type="text" className="form-control"
                id="inputCompany"
                placeholder="Company"
                name="company"
                onChange={this.handleChange}
                value={this.state.company}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="inputemail">Email</label>
              <input type="email" className="form-control"
                id="inputemail"
                placeholder="joe@schmoe.com"
                error={{
                  content: "Please enter a valid email address",
                  pointing: "below",
                }}
                name="email"
                onChange={this.handleChange}
                value={this.state.email} />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputphone">Phone</label>
              <input type="phone" className="form-control"
                id="inputphone"
                placeholder="phone"
                name="phone"
                onChange={this.handleChange}
                value={this.state.phone} />
            </div>
          </div>
          <br />
          <button type="submit" className="btn btn-primary btn-block">Submit</button>
          <Link to="/users" type="button" className="btn btn-light btn-block">Cancel</Link>
        </form>
      </div>
    )

    return (

      <div className="container">
        <h2 className="display-4 bg-primary text-white">Edit User</h2>
        {
          this.state.redirect ? <Redirect to="/users" /> : formContent
        }
      </div>
    )
  }
}

