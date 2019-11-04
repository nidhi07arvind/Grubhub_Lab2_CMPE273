import React, { Component } from "react";
import Header from "../Header/Header";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

class OwnerDashboard extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      itemDetails: [],
      errorRedirect: false,
      isLunch: false
    };
    this.saveChanges = this.saveChanges.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
  }

  componentWillMount() {
    axios.defaults.withCredentials = true;

    axios
      .get("http://localhost:3001/owner-dashboard-details")
      .then(response => {
        if (response.status === 200) {
          console.log("Response : ", response.data);
          this.setState({
            items: response.data
          });
        }
      })
      .catch(err => {
        if (err) {
          this.setState({
            errorRedirect: true
          });
        }
      });
  }

  saveChanges = item => e => {
    console.log(item);

    const data = item;

    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/delete-item", data)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
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

  submitChanges = item => e => {
    console.log(item);

    const data = item;

    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/update-item", data)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
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
    let redrirectVar = null;
    if (!cookie.load("cookie")) {
      redrirectVar = <Redirect to="/login" />;
    }
    if (this.state.errorRedirect === true) {
      redrirectVar = <Redirect to="/error" />;
    }
    console.log(this.state.items);
    let itemDetails = this.state.items.map(function(item, index) {
      return (
        <div className="container trip-details-container" key={index}>
          <Link to={"/update-item/" + item.item_id}>Update Item</Link>
          <div className="trip-details-content border">
            <div className="trip-main-details blue-text">
              <div>Item ID: {item.item_id}</div>
              <div>Item Name: {item.item_name}</div>
              <div>Price: {item.price}</div>
              <div>Description: {item.description}</div>
              <br></br>
              <button
                className="btn btn-danger"
                onClick={this.saveChanges(item)}
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      );
    }, this);

    return (
      <div>
        <Header />
        <div className="dashboard-container">
          <div className="center-content owner-dashboard-banner">
            <h1>Dashboard</h1>
            <span>
              <Link to={"/breakfast-display"}>Breakfast</Link>{" "}
              <Link to={"/lunch-display"}>Lunch</Link>{" "}
              <Link to={"/diner-display"}>Dinner</Link>
            </span>
          </div>
          <div>{itemDetails}</div>
        </div>
      </div>
    );
  }
}

export default OwnerDashboard;
