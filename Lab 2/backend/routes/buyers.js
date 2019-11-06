const express = require("express");
const app = express.Router();
var bcrypt = require("bcrypt");

var kafka = require("../kafka/client");

app.post("/search", function(req, res) {
  console.log("Inside SEARCH POST!");
  console.log("Request Body:", req.body);

  if (req.session.user) {
    kafka.make_request("search", req.body, function(err, result) {
      console.log("in results search");
      console.log(result);
      if (err) {
        console.log("Error in searching items");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in searching items");
      } else {
        console.log("Searching successful!");
        console.log("inside", result);
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end(JSON.stringify(result));
        console.log("stringify", JSON.stringify(result));
      }
    });
  }
});

app.post("/restaurant-display", function(req, res) {
  console.log("Inside Restaurant Details POST!");
  console.log(req.body);

  if (req.session.user) {
    kafka.make_request("restaurantdisplay", req.body, function(err, result) {
      console.log("in results restaurantdisplay");
      console.log(result);
      if (err) {
        console.log("Error in searching restaurants");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in searching restaurants");
      } else {
        console.log("Searching successful!");
        console.log("inside", result);
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end(JSON.stringify(result));
        console.log("stringify", JSON.stringify(result));
      }
    });
  }
});

app.post("/cuisine-display", function(req, res) {
  console.log("Inside Cuisine Details POST!");
  console.log(req.body);

  if (req.session.user) {
    kafka.make_request("cuisinedisplay", req.body, function(err, result) {
      console.log("in results restaurantdisplay");
      console.log(result);
      if (err) {
        console.log("Error in searching restaurants");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in searching restaurants");
      } else {
        console.log("Searching successful!");
        console.log("inside", result);
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end(JSON.stringify(result));
        console.log("stringify", JSON.stringify(result));
      }
    });
  }
});

/*app.get("/breakfast-details", function(req, res) {
  console.log("Inside Breakfast Details GET!");
  const userSession = req.session.user;

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      var presql =
        "SELECT r.res_id from restaurant as r inner join owner as o where r.res_id=o.res_id and o.owner_id=" +
        mysql.escape(userSession.owner_id);

      conn.query(presql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          console.log("Error in getting restaurant id");
          res.end("Error in getting restaurant id");
        } else {
          const res_id = result[0].res_id;
          console.log(res_id);
          console.log("Got restaurant id successful!");
          const section = "Dinner";
          //const item_id = Math.floor(Math.random() * 1000);
          var sql =
            'SELECT * from item where section="Dinner" AND res_id = ' +
            mysql.escape(res_id);
          // +
          // "and section = " +
          // mysql.escape(section);

          conn.query(sql, function(err, result) {
            if (err) {
              // res.writeHead(400, {
              //   "Content-type": "text/plain"
              // });
              console.log("Error in getting  items");
              res.json({ data: "Error in getting items" });
            } else {
              console.log("Items in Dashboard loaded successfully");
              console.log(result);
              // res.writeHead(200, {
              //   "Content-type": "application/json"
              // });
              console.log(JSON.stringify(result));
              //res.end({ data: result });

              res.send(200, JSON.stringify(result));
            }
          });
        }
      });
    }
  });
});*/

app.post("/addtocart", function(req, res) {
  console.log("Inside addtocart POST");
  console.log("Request Body: ", req.body);

  var key1 = "buyer";
  var value1 = req.session.user.email;

  req.body[key1] = value1;

  console.log("new Request Body: ", req.body);

  if (req.session.user) {
    kafka.make_request("addtocart", req.body, function(err, results) {
      console.log("in results signup");
      console.log(results);
      if (err) {
        console.log("Error in adding to cart");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in adding to cart");
      } else {
        console.log("Added to cart");
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("Added to cart");
      }
    });
  }
});

app.get("/cart-details", function(req, res) {
  console.log("Inside Cart Details GET!");

  var key1 = "email";
  var value1 = req.session.user.email;

  req.body[key1] = value1;

  if (req.session.user) {
    kafka.make_request("cartdetails", req.body, function(err, results) {
      console.log("in results cartdetails");
      console.log(results);
      if (err) {
        console.log("Error in fetching cartdetails");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in fetching cartdetails");
      } else {
        console.log("Cart Details loaded successfully");
        res.status(200).send(JSON.stringify(results));
      }
    });
  }
});

app.get("/buyer-order", function(req, res) {
  console.log("Inside Buyer Order Details GET!");

  var key1 = "email";
  var value1 = req.session.user.email;

  req.body[key1] = value1;

  if (req.session.user) {
    kafka.make_request("buyerorder", req.body, function(err, results) {
      console.log("in results dashboard");
      console.log(results);
      if (err) {
        console.log("Error in fetching buyerorder details");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in fetching buyerorder details");
      } else {
        console.log("Buyer Orders loaded successfully");

        res.status(200).send(JSON.stringify(results));
      }
    });
  }
});

/*app.get("/past-order", function(req, res) {
  console.log("Inside Buyer Past Order Details GET!");
  const userSession = req.session.user;
  console.log(req.session.user);

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      console.log("Established connection");
      var sql =
        'SELECT * from orders WHERE status ="completed" AND email = ' +
        mysql.escape(userSession.email);

      conn.query(sql, function(err, result) {
        if (err) {
          console.log("Error in getting order details");

          res.json({ data: "Error in getting order details" });
        } else {
          console.log("Orders loaded successfully");
          console.log(result);
          console.log(JSON.stringify(result));

          res.send(JSON.stringify(result));
        }
      });
    }
  });
});*/

app.post("/place-order", function(req, res) {
  console.log("Inside Place Order GET");
  console.log("Request Body:", req.body);
  //console.log("Res_id:", req.body[0].res_id);
  console.log("Req Length: ", req.body.length);

  if (req.session.user) {
    kafka.make_request("placeorder", req.body, function(err, results) {
      console.log("in results placeorder");
      console.log(results);
      if (err) {
        console.log("Error in placing order");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in placing order");
      } else {
        console.log("Order Placed");
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("Order Placed");
      }
    });
  }
});

app.post("/get-chats", function(req, res) {
  console.log("Inside Buyer Chats GET!");
  console.log(req.body);

  if (req.session.user) {
    kafka.make_request("getchat", req.body, function(err, results) {
      console.log("in results sendchat");
      console.log(results);
      if (err) {
        console.log("Error in updating items");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in updating items");
      } else {
        console.log("getchat success!");
        console.log(
          "Json result",

          JSON.stringify(results[0].chats.buyer_msg.bm),
          JSON.stringify(results[0].chats.owner_msg.om)
        );
        res.status(200).send(
          JSON.stringify(results[0].chats.buyer_msg.bm)
          //JSON.stringify(results[0].chats.owner_msg.om)
        );
      }
    });
  }
});
app.post("/send-chat", async function(req, res) {
  console.log("Inside Buyer Send Chats POST!");
  var key1 = "email";
  var value1 = req.session.user.email;
  req.body[key1] = value1;
  var key2 = "accounttype";
  var value2 = req.session.user.accounttype;
  req.body[key2] = value2;
  if (req.session.user.accounttype === 2) {
    var key2 = "res_id";
    var value2 = req.session.user.res_id;
    req.body[key2] = value2;
  }

  console.log("new Request Body: ", req.body);

  if (req.session.user) {
    kafka.make_request("sendchat", req.body, function(err, results) {
      console.log("in results sendchat");
      console.log(results);
      if (err) {
        console.log("Error in updating items");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in updating items");
      } else {
        console.log("sendchat success!");
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("sendchat success!");
      }
    });
  }
});

module.exports = app;
