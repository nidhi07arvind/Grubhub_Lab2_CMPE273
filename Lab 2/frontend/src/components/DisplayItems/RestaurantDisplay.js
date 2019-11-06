import React, { Component } from "react";
import cookie, { save } from "react-cookies";
import { Redirect } from "react-router";
import Header from "../Header/Header";
import "bootstrap/dist/css/bootstrap.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { restaurantitems } from "../../actions/DashboardActions";
import { addtocart } from "../../actions/OrderActions";

class RestaurantDisplay extends Component {
  componentDidMount() {
    var data = {
      res_id: this.props.match.params.id
    };
    this.props.restaurantitems(data);
  }

  saveChanges = item => e => {
    console.log(item);
    const data = item;
    this.props.addtocart(data);
  };

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.props.errorRedirect) {
      redirectVar = <Redirect to="/error" />;
    }

    let itemDetails = this.props.r_items.map(function(item, index) {
      return (
        <div
          class="card"
          style={{ width: "20rem", height: "20rem" }}
          key={index}
        >
          <img
            src={require("../../Static/Images/pizza.jpg")}
            class="card-img-top"
            alt="jamoon"
          />
          <div class="card-body">
            <p class="card-text"></p>

            <button onClick={this.saveChanges(item)}>Add to Cart</button>
            <div
              style={{
                fontSize: 25,
                color: "black",
                fontFamily: "Cochin",
                fontWeight: "bold"
              }}
            >
              Restaurant: {item.res_name}
            </div>
            <div>Item Type : {item.item_id}</div>
            <div>{item.item_name}</div>
            <div>{item.price}$</div>
            <div>{item.description}</div>
          </div>
        </div>
      );
    }, this);

    return (
      <div>
        <Header />
        <div className="dashboard-container">
          <div className="center-content owner-dashboard-banner">
            <h1>Choose Items!</h1>
          </div>
        </div>

        <div>{itemDetails}</div>
      </div>
    );
  }
}

RestaurantDisplay.propTypes = {
  r_items: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    r_items: state.r_items.restaurants
  };
};

export default connect(
  mapStateToProps,
  { restaurantitems, addtocart }
)(RestaurantDisplay);
