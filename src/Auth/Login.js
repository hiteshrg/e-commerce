import {
  Box,
  Button,
  FormGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: [],
      login: {
        email: "kate@gmail.com",
        password: "kfejk@*_",
      },
      error: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("LoginToken")) {
      this.props.history.push("/dashboard");
    }
    axios({
      method: "GET",
      url: "https://fakestoreapi.com/users",
    })
      .then((result) => {
        this.setState({ api: result.data });
      })
      .catch((err) => console.log("Error :", err));
  }

  handleChange(e) {
    this.setState({
      login: {
        ...this.state.login,
        [e.target.name]: e.target.value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ error: "" });
    const tokenLogin = this.state.api
      .filter((item) => item.email === this.state.login.email)
      .map((ele) => ele.email);
    const tokenPassword = this.state.api
      .filter((item) => item.password === this.state.login.password)
      .map((ele) => ele.password);
    if (
      tokenLogin[0] === this.state.login.email &&
      tokenPassword[0] === this.state.login.password
    ) {
      this.props.history.push("/dashboard");
      localStorage.setItem("LoginToken", JSON.stringify(this.state.login));
    } else {
      this.setState({ error: "Authantication Failed" });
    }
  }

  render() {
    return (
      <div className="container login-container">
        <Box boxShadow={3} p={5} m={5} width={500}>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <div>
                <Typography variant="h5" className="text-center">
                  Login Here
                </Typography>
                {this.state.error ? (
                  <Typography
                    variant="body1"
                    className="text-center my-2 text-danger fw-bold"
                  >
                    {this.state.error}
                  </Typography>
                ) : (
                  ""
                )}
              </div>

              <TextField
                className="my-2"
                name="email"
                value={this.state.login.email}
                onChange={(e) => this.handleChange(e)}
                label="Email"
                size="small"
              />
              <TextField
                className="my-2"
                name="password"
                type="password"
                value={this.state.login.password}
                onChange={(e) => this.handleChange(e)}
                label="Password"
                size="small"
              />
              <Button
                type="submit"
                variant="contained"
                className="my-3 bg-dark text-light"
              >
                Login
              </Button>
            </FormGroup>
          </form>
        </Box>
      </div>
    );
  }
}

export default withRouter(Login);
