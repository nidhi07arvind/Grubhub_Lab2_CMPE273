import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Header from "../Header/Header";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileDetails } from "../../actions/ProfileActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      city: ""
    };

    //Bind
    this.handleChange = this.handleChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    this.props.getProfileDetails(res => {
      var data = res.data;
      console.log(data);

      this.setState({
        name: data.name,
        email: data.email,
        city: data.city
      });
    });

    // console.log("key name", Object.keys(this.props.profile));
    // const result = this.props.profile;
    // console.log("result", result);
    // var keyArray = Object.keys(this.props.profile);
    // console.log("keyArray", keyArray);
    // for (var i = 0; i < keyArray.length; i++) {
    //   var name = keyArray[i];
    //   console.log("name:", name);
    //   var obj1 = result[name];
    //   console.log("values", Object.values(obj1));
    //   console.log("obj1", obj1);
    //   console.log("result[i]", i, result[name]);
    //   //console.log("email", result[0][0]);
    //   //console.log("testname", name.email);
    //   this.setState({
    //     name: Object.values(obj1)[1],
    //     email: Object.values(obj1)[2],
    //     aboutme: Object.values(obj1)[5],
    //     city: Object.values(obj1)[6],
    //     company: Object.values(obj1)[7],
    //     country: Object.values(obj1)[8],
    //     gender: Object.values(obj1)[9],
    //     phone: Object.values(obj1)[10]
    //     //[name]: result[name]
    //   });
    // }
    console.log("state", this.state);
  }

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };

  saveChanges = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      aboutme: this.state.aboutme,
      country: this.state.country,
      city: this.state.city,
      gender: this.state.gender,
      company: this.state.company,
      profileimage: this.state.profileimage
    };

    console.log("Data: ", data);
    axios
      .post("http://localhost:3001/update-profile", data)
      .then(response => {
        if (response.status === 200) {
          console.log("");
        }
      })
      .catch(err => {
        if (err) {
          this.setState({
            errorRedirect: true
          });
        }
      });
  };

  render() {
    let owner_tab = null;
    let redrirectVar = null;
    if (!cookie.load("cookie")) {
      redrirectVar = <Redirect to="/login" />;
    }

    // if (this.props.profile.errorRedirect === true) {
    //   redrirectVar = <Redirect to="/error" />;
    // }

    //if (cookie.load("owner")) {
    // if (this.state.accounttype === 2) {
    //   owner_tab = (
    //     <div className="form-group">
    //       <input
    //         type="text"
    //         name="res_id"
    //         id="res_id"
    //         className="form-control form-control-lg"
    //         placeholder="Restaurant ID"
    //         onChange={this.handleChange}
    //         value={this.state.name}
    //       />
    //     </div>
    //   );
    // }

    // let profileImageData = (
    //   <img
    //     src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg"
    //     alt="logo"
    //   />
    // );
    // if (this.state.ProfileImagePreview) {
    //   profileImageData = (
    //     <img src={this.state.ProfileImagePreview} alt="logo" />
    //   );
    // }
    // }
    return (
      <div>
        <Header />
        <div className="container">
          <h3>
            Hello! {this.state.name} {this.state.accounttype}
          </h3>
          <p></p>
        </div>
        <div className="container profile-content">
          <div className="row">
            <div className="col-8 border">
              <div className="headline-text">
                <h4>
                  <strong>Profile Information</strong>
                </h4>
              </div>
              <div className="profile-form-content">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control form-control-lg"
                    placeholder="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Email address"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </div>
                <div>{owner_tab}</div>
                <div className="form-group">
                  <textarea
                    type="text"
                    name="aboutme"
                    id="aboutme"
                    className="form-control form-control-lg"
                    placeholder="About me"
                    onChange={this.handleChange}
                    value={this.state.aboutme}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="form-control form-control-lg"
                    placeholder="Phone"
                    onChange={this.handleChange}
                    value={this.state.phone}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="country"
                    id="country"
                    className="form-control form-control-lg"
                    placeholder="Country"
                    onChange={this.handleChange}
                    value={this.state.country}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="form-control form-control-lg"
                    placeholder="City"
                    onChange={this.handleChange}
                    value={this.state.city}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="gender"
                    id="gender"
                    className="form-control form-control-lg"
                    placeholder="Gender"
                    onChange={this.handleChange}
                    value={this.state.gender}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="form-control form-control-lg"
                    placeholder="Company"
                    onChange={this.handleChange}
                    value={this.state.company}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ProfileImage">
                    <strong>Profile Image : </strong>
                  </label>
                  <br />
                  <input
                    type="file"
                    name="profileimage"
                    id="profileimage"
                    className="btn btn-lg photo-upload-btn"
                    onChange={this.handleChange}
                    className="btn btn-lg photo-upload-btn"
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-lg btn-primary"
                    onClick={this.saveChanges}
                  >
                    Save Changes
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

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(
  mapStateToProps,
  { getProfileDetails }
)(Profile);
