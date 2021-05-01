import React, { Component } from 'react'
import EditUserForm from '../components/EditUserForm';

export default class EditUserPage extends Component {

  render() {

    console.log(this.props.currentUser)
    return (
      <div>
        <EditUserForm willEditData={this.props.currentUser} editUser={this.props.editUser} />
      </div>
    )
  }
}
