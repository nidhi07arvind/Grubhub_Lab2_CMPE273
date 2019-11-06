const express = require("express");
const app = express.Router();
var bcrypt = require("bcrypt");

var kafka = require("../kafka/client");

var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });

app.post("/additem", function(req, res) {
  console.log("Inside AddItems POST");
  console.log("Request Body: ", req.body);

  console.log(req.session.user);

  var key1 = "res_id";
  var value1 = req.session.user.res_id;
  var key2 = "res_name";
  var value2 = req.session.user.res_name;
  req.body[key1] = value1;
  req.body[key2] = value2;

  console.log("new Request Body: ", req.body);

  if (req.session.user) {
    kafka.make_request("additem", req.body, function(err, results) {
      console.log("in results additem");
      console.log(results);
      if (err) {
        console.log("Error in adding items");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in adding items");
      } else {
        console.log("Adding a Item successful!");
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("Adding a Item successful!");
      }
    });
  }
});

app.get("/owner-dashboard-details", async function(req, res) {
  console.log("Inside Owner Dashboard Details GET!");
  const userSession = req.session.user;

  var key1 = "res_id";
  var value1 = req.session.user.res_id;

  req.body[key1] = value1;

  console.log("new Request Body: ", req.body);

  if (req.session.user) {
    kafka.make_request("ownerdashboard", req.body, function(err, results) {
      console.log("in results dashboard");
      console.log(results);
      if (err) {
        console.log("Error in fetching dashboard details");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in adding items");
      } else {
        console.log("Items in Dashboard loaded successfully");

        res.status(200).send(JSON.stringify(results));
      }
    });
  }
});

app.post("/delete-item", function(req, res) {
  console.log("Inside delete item from menu POST");
  console.log("Request Body: ", req.body);
  const userSession = req.session.user;

  if (req.session.user) {
    kafka.make_request("deleteitems", req.body, function(err, results) {
      console.log("in results deleteitem");
      console.log(results);
      if (err) {
        console.log("Error in deleting items");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in deleting items");
      } else {
        console.log("Deleting a Item successful!");
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("Deleting a Item successful!");
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
            'SELECT * from item where section="Breakfast" AND res_id = ' +
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
});

app.get("/lunch-details", function(req, res) {
  console.log("Inside Lunch Details GET!");
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

          var sql =
            'SELECT * from item where section="lunch" AND res_id = ' +
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
});
app.get("/dinner-details", function(req, res) {
  console.log("Inside Dinner Details GET!");
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
            'SELECT * from item where section="dinner" AND res_id = ' +
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

/*app.post("/update-owner-order", function(req, res) {
  console.log("Inside Update Order POST");
  console.log("Request Body:", req.body);
  console.log("Res_id:", req.body[0].res_id);
  console.log("Req Length: ", req.body.length);

  const res_id = req.body[0].res_id;
  const email = req.body[0].email;
  // const order_id = 101;
  // const res_id = 1;
  // const email = "nidhi@gmail.com";
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in establishing connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in establishing connection!");
    } else {
      /*var sql2 =
        "UPDATE orders (status) VALUES(" +
        mysql.escape(status) +
        ");";

      conn.query(sql2, function(err, result) {
        if (err) {
          console.log("Error in adding order");
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          res.end("Error in adding an order");
        } else {
          console.log("Adding order successful!");
          // res.writeHead(200, {
          //   "Content-type": "text/plain"
          // });
          res.end("Adding order successful!");
        }
      });*/

/*for (var index = 0; index < req.body.length; index++) {
        var sql3 =
          "UPDATE orders set " +
          "status = " +
          mysql.escape(req.body[index].status) +
          " WHERE order_id = " +
          mysql.escape(req.body[index].order_id);

        conn.query(sql3, function(err, result) {
          if (err) {
            console.log("Error in updating order");
          } else {
            console.log("Order updated successfully!", index);
            res.end("Order updated successfully!");
          }
        });
      }
    }
  });
});*/

app.post("/item-details", function(req, res) {
  console.log("Inside item details POST");
  console.log("Request Body:", req.body);

  if (req.session.user) {
    kafka.make_request("itemdetails", req.body, function(err, results) {
      console.log("in results itemdetails");
      console.log(results);
      if (err) {
        console.log("Error in fetching items");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in fetching items");
      } else {
        console.log("Item details loaded successful!");
        console.log("inside", results);
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end(JSON.stringify(results[0]));
        console.log("stringify", JSON.stringify(results));
      }
    });
  }
});

app.post("/update-item", function(req, res) {
  console.log("Inside UPDATE ITEM POST");
  console.log("Request Body:", req.body);
  const userSession = req.session.user;
  const item_num = parseInt(req.body.item_id);
  console.log(item_num);

  if (req.session.user) {
    kafka.make_request("updateitems", req.body, function(err, results) {
      console.log("in results updateitems");
      console.log(results);
      if (err) {
        console.log("Error in updating items");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in updating items");
      } else {
        console.log("Items updated successful!");
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("Items updated successful!");
      }
    });
  }
});

app.get("/owner-order-details", function(req, res) {
  console.log("Inside Owner Order Details GET!");

  var key1 = "res_id";
  var value1 = req.session.user.res_id;

  req.body[key1] = value1;

  console.log("new Request Body: ", req.body);

  if (req.session.user) {
    kafka.make_request("ownerorder", req.body, function(err, results) {
      console.log("in results ownerorder");
      console.log(results);
      if (err) {
        console.log("Error in fetching ownerorder details");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in adding items");
      } else {
        console.log("ownerorder loaded successfully");

        res.status(200).send(JSON.stringify(results));
      }
    });
  }
});

/*app.post("/send-chat", async function(req, res) {
  console.log("Inside Buyer nids Chats POST!");

  console.log(req.session.user);

  var res_id;

  if (req.session.user) {
    const { connection, client } = await getConnectionMongo();

    connection
      .collection("orders")
      .find({ email: req.session.user.email })
      .toArray(function(err, result) {
        if (err) console.log("Error in fetching profile details");
        else {
          console.log("Items in Dashboard loaded successfully");
          console.log(result);
          res_id = result[0].res_id;
          console.log(res_id);

          console.log(JSON.stringify(result));
          res.status(200).send(JSON.stringify(result));
        }
      });

    console.log("outside loop", res_id);

    var chat = {
      buyer: req.session.user.email,
      res_id: res_id,
      message: req.body.type_message
    };

    connection.collection("chats").insertOne(chat, function(err, result) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        console.log("Error in adding items");
        res.end("Error in adding items");
      } else {
        console.log("Item added successfully");
        // res.writeHead(200, {
        //   "Content-type": "text/plain"
        // });
        res.end("Message added successfully!");
      }
    });

    client.close();
  }
});*/

module.exports = app;
