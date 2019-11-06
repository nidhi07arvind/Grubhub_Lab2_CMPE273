import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import Header from "../Header/Header";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateitems } from "../../actions/ItemsActions";
import { rooturl } from "../../config/settings";

class UpdateItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item_name: "",
      description: "",
      price: "",
      select: "",
      errorRedirect: false,
      isUpdate: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;
    var data = {
      item_id: this.props.match.params.id
    };
    console.log("Data Item_ID:", data);
    axios.post(`${rooturl}/item-details`, data).then(response => {
      if (response.status === 200) {
        console.log(response.data);
        var data = response.data;
        this.setState({
          item_name: data.item_name,
          description: data.description,
          price: data.price,
          section: data.section
        });
      }
    });
  }
  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    const data = {
      item_id: this.props.match.params.id,
      item_name: this.state.item_name,
      description: this.state.description,
      //section: this.state.section,
      price: this.state.price
      //image: this.state.image
    };
    console.log("Data:", data);

    this.props.updateitems(data);
  };

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.state.errorRedirect === true) {
      redirectVar = <Redirect to="/error" />;
    }

    return (
      <div>
        <Header />
        <div className="container">
          <h3>{this.state.item_name}</h3>
          <p></p>
        </div>
        <div className="container profile-content">
          <div className="row">
            <div className="col-8 border">
              <div className="headline-text">
                <h4>
                  <strong>Item Information</strong>
                </h4>
              </div>
              <div className="profile-form-content">
                <div className="form-group">
                  <input
                    type="text"
                    name="item_name"
                    id="item_name"
                    className="form-control form-control-lg"
                    placeholder="Item name"
                    onChange={this.handleChange}
                    value={this.state.item_name}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="form-control form-control-lg"
                    placeholder="Description"
                    onChange={this.handleChange}
                    value={this.state.description}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="form-control form-control-lg"
                    placeholder="Price"
                    onChange={this.handleChange}
                    value={this.state.price}
                  />
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2">Menu Section</label>
                  <select class="form-control" onChange={this.handleChange}>
                    <option value="select">Select</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>
                <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-10">
                    <button
                      name="Save"
                      onClick={this.handleSubmit}
                      style={{
                        background: "#0067db",
                        width: "200px",
                        borderRadius: "20px",
                        height: "46px",
                        color: "white"
                      }}
                    >
                      Update Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateItems.propTypes = {
  updateitems: PropTypes.func.isRequired
};

export default connect(
  null,
  { updateitems }
)(UpdateItems);
