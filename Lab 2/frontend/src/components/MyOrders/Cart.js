import React, { Component } from "react";
import Header from "../Header/Header";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { rooturl } from "../../config/settings";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { cartitems } from "../../actions/DashboardActions";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{ item_id: "", res_id: "", quantity: "" }],

      itemDetails: [],
      errorRedirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e, item_id, quantity) => {
    let checkItems = this.state.items.map(item => {
      if (item.item_id == item_id) {
        item.quantity = e.target.value;

        this.setState({
          quantity: e.target.value
        });
        console.log(item.quantity);
      }
      return item;
    });

    console.log("Updated items", checkItems);
  };

  handleSubmit = e => {
    e.preventDefault;

    axios.defaults.withCredentials = true;

    const { data } = this.state.items[0].item_id;

    axios
      .post(`${rooturl}/place-order`, this.state.items)
      .then(response => {
        if (response === 200) {
          console.log("Order placed");
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

  componentDidMount() {
    //this.props.cartitems();
    axios.defaults.withCredentials = true;

    axios
      .get(`${rooturl}/cart-details`)
      .then(response => {
        if (response.status === 200) {
          console.log("Response : ", response.data);
          let data = response.data;
          data = data.map(item => {
            this.setState({
              items: response.data,
              item_id: data.item_id,
              res_id: data.res_id,
              quantity: data.quantity,
              price: data.price
            });
            console.log(item.quantity);
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

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.state.errorRedirect === true) {
      redirectVar = <Redirect to="/error" />;
    }
    console.log(this.state.items);
    let totalprice = null;
    let itemDetails = this.state.items.map(function(item, index) {
      totalprice += item.price * item.quantity;
      return (
        <div className="container trip-details-container" key={index}>
          <div className="trip-details-content border">
            <div className="trip-main-details blue-text">
              <div>Item Type : {item.item_id}</div>
              <div>{item.item_name}</div>
              <div>Price: {item.price}$</div>
              <div>
                Quantity:{console.log("quantity", item.quantity)}
                <input
                  type="text"
                  name="quantity"
                  onChange={e => {
                    this.handleChange(e, item.item_id, item.quantity);
                  }}
                ></input>
              </div>
              <br></br>
              <button className="btn btn-danger">Delete Item</button>
              <div>{item.description}</div>
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
            <h1>Cart</h1>
            <h1>Total Price: {totalprice}</h1>
            <button className="btn-btn-success" onClick={this.handleSubmit}>
              Place Order
            </button>
          </div>
          <div>{itemDetails}</div>
        </div>
      </div>
    );
  }
}

/*Cart.propTypes = {
  cartitems: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    r_items: state.r_items.cart_items
  };
};

export default connect(
  mapStateToProps,
  { cartitems }
)(Cart);*/

export default Cart;
