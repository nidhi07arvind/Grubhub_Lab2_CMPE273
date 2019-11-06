import React, { Component } from "react";
import axios from "axios";
import ImageUploader from "react-images-upload";
import Header from "../Header/Header";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { rooturl } from "../../config/settings";

class BuyerChat extends Component {
  constructor() {
    super();

    this.state = {
      type_message: "",
      chats: [],
      chatDetails: [],
      isSave: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    var data = {
      order_id: this.props.match.params.id
    };
    axios.defaults.withCredentials = true;
    axios
      .post(`${rooturl}/get-chats`, data)
      .then(response => {
        if (response.status === 200) {
          console.log("Response : ", response.data);
          var data = response.data;
          this.setState({
            chats: response.data
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

  handleChange = e => {
    this.setState({
      type_message: e.target.value
    });
  };

  saveChanges = () => {
    const data = {
      type_message: this.state.type_message
    };

    console.log("data", data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;

    //make a post request with the user data
    axios.post(`${rooturl}/send-chat`, data).then(response => {
      console.log("Status Code : ", response.status);
      console.log(response.request.response);
      if (response.status === 200) {
        // this.setState({
        //   chats: response.data
        // });
        console.log("Item created successfully");
      } else {
        this.setState({
          errorRedirect: false
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
    console.log("chat array", this.state.chats);
    let chatDetails = this.state.chats.map(function(chat, index) {
      return (
        <div className="container trip-details-container" key={index}>
          <div className="alert alert-primary">
            <div className="trip-main-details blue-text">
              <div>Message: {chat}</div>
              <br></br>
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
            <h1>Chats</h1>
          </div>
          <div>{chatDetails}</div>
          <div class="form-group">
            <div
              class="col-xs-6 col-xs-offset-3"
              style={{
                width: "500px",
                borderRadius: "20px",
                height: "46px",
                color: "red"
              }}
            >
              <input
                type="text"
                class="form-control"
                name="type_message"
                placeholder="Enter Item Name"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button
                name="Save"
                onClick={this.saveChanges}
                style={{
                  background: "#0067db",
                  width: "200px",
                  borderRadius: "20px",
                  height: "46px",
                  color: "white"
                }}
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyerChat;
