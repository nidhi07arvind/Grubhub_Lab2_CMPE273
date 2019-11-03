var connection = require("./kafka/Connection");

var Signup = require("./services/signup");
var OwnerSignup = require("./services/ownersignup");
var ProfileDetails = require("./services/profileDetails");
var AddItem = require("./services/additem");
var OwnerDashboard = require("./services/ownerdashboard");
var DeleteItem = require("./services/deleteitems");
var Login = require("./services/login");
var ItemDetails = require("./services/itemdetails");
var UpdateItems = require("./services/updateitems");
var Search = require("./services/search");
var RestaurantDisplay = require("./services/restaurantdisplay");
var CuisineDisplay = require("./services/cuisinedisplay");
var AddToCart = require("./services/addtocart");
var CartDetails = require("./services/cartdetails");
var PlaceOrder = require("./services/placeorder");
var BuyerOrder = require("./services/buyerorder");
var OwnerOrder = require("./services/ownerorder");
var SendChat = require("./services/sendchat");
var GetChat = require("./services/getchat");

function handleTopicRequest(topic_name, function_name) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();

  console.log("server is running");
  consumer.on("message", function(message) {
    console.log("message recieved for " + topic_name + " " + function_name);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    function_name.handle_request(data.data, function(err, res) {
      console.log("After request handling: ", res);
      var payload = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];

      producer.send(payload, function(err, data) {
        console.log("Data: ", data);
      });
      return;
    });
  });
}

handleTopicRequest("signup", Signup);
handleTopicRequest("ownersignup", OwnerSignup);
handleTopicRequest("profiledetails", ProfileDetails);
handleTopicRequest("additem", AddItem);
handleTopicRequest("ownerdashboard", OwnerDashboard);
handleTopicRequest("deleteitems", DeleteItem);
handleTopicRequest("login", Login);
handleTopicRequest("itemdetails", ItemDetails);
handleTopicRequest("updateitems", UpdateItems);
handleTopicRequest("search", Search);
handleTopicRequest("restaurantdisplay", RestaurantDisplay);
handleTopicRequest("cuisinedisplay", CuisineDisplay);
handleTopicRequest("addtocart", AddToCart);
handleTopicRequest("cartdetails", CartDetails);
handleTopicRequest("placeorder", PlaceOrder);
handleTopicRequest("buyerorder", BuyerOrder);
handleTopicRequest("ownerorder", OwnerOrder);
handleTopicRequest("sendchat", SendChat);
handleTopicRequest("getchat", GetChat);
