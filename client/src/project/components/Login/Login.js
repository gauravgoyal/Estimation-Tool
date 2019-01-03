import React, { Component } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import "./Login.css";

export default class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.checkUser(this.username.value, this.password.value);
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="loginName">Username</Label>
          <Input autoComplete="off" innerRef={(input) => (this.username = input)} type="textfield" name="name" id="loginName" placeholder="Enter your username" />
        </FormGroup>
        <FormGroup>
          <Label for="loginPassword">Password</Label>
          <Input autoComplete="off" innerRef={(input) => (this.password = input)} type="password" name="password" id="loginPassword" placeholder="Enter your password" />
        </FormGroup>
        <Button color="success">Submit</Button>
        </form>
      </div>
    );
  }
}