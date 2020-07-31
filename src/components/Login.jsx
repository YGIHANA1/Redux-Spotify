import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
export default class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  handleName = (e) => {
    this.setState({ usename: e.target.value });
  };
  handleChange = (e) => {
    this.setState({ password: e.target.value });
  };
  login = (e) => {
    alert("Welcome " + this.state.value);
    e.preventDefault();
  };
  render() {
    return (
      <Container>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>username</Form.Label>
            <Form.Control
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="Enter your user name"
            />
          </Form.Group>

          <Form.Group controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.login}>
            Login
          </Button>
        </Form>
      </Container>
    );
  }
}
