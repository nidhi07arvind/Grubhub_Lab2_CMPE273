import React, { Component } from "react";
import cookie from "react-cookies";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { rooturl } from "../../config/settings";

class Header extends Component {
  constructor() {
    super();

    //bind
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios.post(`${rooturl}/logout`).then(response => {
      if (response.status === 200) {
        console.log("User logged out!");
      }
    });
  };

  render() {
    let loggedInUserContent = null;
    let ownerTab = null;
    let buyerTab = null;
    let buyerTab1 = null;

    if (cookie.load("owner")) {
      ownerTab = (
        <span>
          <span>
            <a href="/add-items" className="btn btn-sm lyp-btn">
              Add Items
            </a>
          </span>
          <span>
            <a href="/owner-dashboard" className="btn btn-sm lyp-btn">
              Dashboard
            </a>
          </span>
          <span>
            <a href="/owner-order-details" className="btn btn-sm lyp-btn">
              Orders
            </a>
          </span>
          <span>
            <a href="/get-owner-chats" className="btn btn-sm lyp-btn">
              Chats
            </a>
          </span>

          <span>
            <a
              className="btn btn-sm lyp-btn"
              href="/login"
              onClick={this.handleLogout}
            >
              Logout
            </a>
          </span>
        </span>
      );
    }

    if (cookie.load("buyer")) {
      buyerTab = (
        <span>
          <span>
            <a href="/buyer-order" className="btn btn-sm lyp-btn">
              Orders
            </a>
          </span>
          <span>
            <a href="/cart-details" className="btn btn-sm lyp-btn">
              Cart
            </a>
          </span>
          <span>
            <a
              className="btn btn-sm lyp-btn"
              href="/login"
              onClick={this.handleLogout}
            >
              Logout
            </a>
          </span>
        </span>
      );
    }

    if (cookie.load("buyer")) {
      buyerTab1 = (
        <span>
          <a href="/get-chats" className="btn btn-sm lyp-btn">
            Chat
          </a>
        </span>
      );
    }

    let username = cookie.load("cookie");
    if (cookie.load("cookie")) {
      loggedInUserContent = (
        <span className="header-bar-tabs">
          <a className="btn btn-sm lyp-btn" href="/profile-details">
            Profile
          </a>
          {ownerTab}
          {buyerTab}
          {buyerTab1}
          <span>
            <a>Welcome! {username}</a>

            <div></div>
          </span>
        </span>
      );
    }

    return (
      <div className="container header-container">
        <div className="header-bar">
          <a href="/home">
            <img
              src={require("../../Static/Images/grubhub.jpg")}
              style={{ width: 200, height: 200 }}
              alt="logo-grubhub"
            />
          </a>

          {loggedInUserContent}

          <a href="/home">
            <img
              src={require("../../Static/Images/fd.jpg")}
              style={{ width: 200, height: 200 }}
              alt="logo"
              className="flt-right"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default Header;
