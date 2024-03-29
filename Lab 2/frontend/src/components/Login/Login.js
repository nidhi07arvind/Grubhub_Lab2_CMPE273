import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Header from "../Header/Header";
import { rooturl } from "../../config/settings";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      Email: "",
      Password: "",
      Profile: "",
      formValidationFailure: false,
      isValidationFailure: true,
      errorRedirect: false
    };

    //Bind events
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.profileChangeHandler = this.profileChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  emailChangeHandler = e => {
    this.setState({
      Email: e.target.value
    });
  };

  passwordChangeHandler = e => {
    this.setState({
      Password: e.target.value
    });
  };

  profileChangeHandler = e => {
    this.setState({
      Profile: e.target.value
    });
  };

  submitLogin = e => {
    e.preventDefault();

    var data = {
      Email: this.state.Email,
      Password: this.state.Password,
      Profile: this.state.Profile
    };

    if (this.state.Email === "" || this.state.Password === "") {
      this.setState({
        formValidationFailure: true
      });

      console.log("Form Error!");
    } else {
      axios.defaults.withCredentials = true;

      axios
        .post(`${rooturl}/login`, data)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              isValidationFailure: true,
              formValidationFailure: false
            });
          }
        })
        .catch(err => {
          if (err) {
            if (err.status === 401) {
              this.setState({
                isValidationFailure: false
              });
              console.log("Error message", err.response.status);
            } else {
              this.setState({
                errorRedirect: true
              });
            }
          }
        });
    }
  };

  render() {
    let redrirectVar = null;
    if (cookie.load("cookie")) {
      redrirectVar = <Redirect to="/home" />;
    }

    // if (this.state.errorRedirect) {
    //   redrirectVar = <Redirect to="/error" />;
    // }

    let errorPanel = null;
    if (!this.state.isValidationFailure) {
      errorPanel = (
        <div>
          <div className="alert alert-danger" role="alert">
            <strong>Validation Error!</strong> Username and Password doesn't
            match!
          </div>
        </div>
      );
    }
    let formErrorPanel = null;
    console.log("FormvalidationFailure", this.state.formValidationFailure);
    if (this.state.formValidationFailure) {
      formErrorPanel = (
        <div>
          <div className="alert alert-danger" role="alert">
            <strong>Validation Error!</strong> Username and Password are
            required!
          </div>
        </div>
      );
    }
    return (
      <div>
        <Header />
        <div className="container fill-graywhite">
          {redrirectVar}
          <div className="container content">
            <div className="login-container">
              <div>
                <p>Log in to Grubhub</p>
                <p>
                  Need an account? <a href="/sign-up">Sign Up</a>
                </p>
              </div>
              <div>
                <p>
                  Need an Owner account?{" "}
                  <a href="/owner-sign-up">Owner Sign Up</a>
                </p>
              </div>
              <div className="login-form-container col-lg-4 col-md-4 col-sm-12 offset-lg-4 offset-md-4 border">
                <div className="login-form-heading input-group pad-top-10 input-group-lg">
                  Account login
                </div>
                <hr />
                {errorPanel}
                {formErrorPanel}
                <div className="form-group login-form-control">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    onChange={this.emailChangeHandler}
                    required
                  />
                </div>
                <div className="form-group login-form-control">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    onChange={this.passwordChangeHandler}
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2">Choose Profile </label>
                  <select
                    class="form-control"
                    onChange={this.profileChangeHandler}
                  >
                    <option value="select">Select</option>
                    <option value="Owner">Owner</option>
                    <option value="Buyer">Buyer</option>
                  </select>
                </div>
                <div className="form-group login-form-control">
                  <a href="" className="">
                    Forgot Password?
                  </a>
                </div>
                <div className="form-group login-form-control">
                  <button
                    className="btn btn-login col-lg-12 col-md-12 col-sm-12"
                    onClick={this.submitLogin}
                  >
                    Login{" "}
                  </button>
                </div>
                <hr />
                <div className="form-group login-form-control">
                  <button className="btn fb-btn col-lg-12 col-md-12 col-sm-12">
                    <img
                      className="fb-logo flt-left"
                      src={require("../../Static/Images/fb.png")}
                      alt="fb-logo"
                    ></img>
                    Log in with Facebook
                  </button>
                </div>
                <div className="form-group login-form-control">
                  <button className="btn google-btn col-lg-12 col-md-12 col-sm-12">
                    <span>
                      <img
                        className="google-logo flt-left"
                        src={require("../../Static/Images/google.jpg")}
                        alt="google-logo"
                      ></img>
                    </span>
                    Log in with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
