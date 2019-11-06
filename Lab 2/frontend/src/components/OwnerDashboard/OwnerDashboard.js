import React, { Component } from "react";
import Header from "../Header/Header";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { rooturl } from "../../config/settings";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateitems, deleteitems } from "../../actions/ItemsActions";
import { dashboarditems } from "../../actions/DashboardActions";

class OwnerDashboard extends Component {
  componentDidMount() {
    this.props.dashboarditems();
  }

  saveChanges = item => e => {
    e.preventDefault();
    console.log(item);
    const data = item;
    this.props.deleteitems(data);
  };

  submitChanges = item => e => {
    console.log(item);
    const data = item;
    this.props.updateitems(data);
  };

  render() {
    let redrirectVar = null;
    if (!cookie.load("cookie")) {
      redrirectVar = <Redirect to="/login" />;
    }
    if (this.props.errorRedirect === true) {
      redrirectVar = <Redirect to="/error" />;
    }

    let itemDetails = this.props.r_items.map(function(item, index) {
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

OwnerDashboard.propTypes = {
  dashboarditems: PropTypes.func.isRequired,
  r_items: PropTypes.array.isRequired,
  deleteitems: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    r_items: state.r_items.items
  };
};

export default connect(
  mapStateToProps,
  { deleteitems, dashboarditems }
)(OwnerDashboard);
